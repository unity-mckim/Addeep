#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------
# Local runner for remote Next.js deploy
# ---------------------------------------
# USAGE:
#   ./deploy_nextapp.sh setup <IP> <USER> <DOMAIN> <BUILD_TGZ>
#   ./deploy_nextapp.sh redeploy <IP> <USER> <BUILD_TGZ>
#   ./deploy_nextapp.sh enable_https <IP> <USER> <DOMAIN>
#
# EXAMPLE:
#   ./deploy_nextapp.sh setup 34.64.176.201 addeepsns addeep.co.kr ./build.tgz
#   ./deploy_nextapp.sh redeploy 34.64.176.201 addeepsns ./build.tgz
#   ./deploy_nextapp.sh enable_https 34.64.176.201 addeepsns addeep.co.kr
#
# Notes:
# - Installs: nodejs(20), nginx, certbot, swap(2G)
# - App dir: /var/www/nextapp
# - Service: nextapp.service (systemd)
# - Nginx: /etc/nginx/sites-available/nextapp (symlinked)
# ---------------------------------------

MODE="${1:-}"
IP="${2:-}"
USER="${3:-}"
DOMAIN="${4:-}"
BUILD="${5:-}"

if [[ -z "$MODE" ]]; then
  echo "Usage:
  $0 setup <IP> <USER> <DOMAIN> <BUILD_TGZ>
  $0 redeploy <IP> <USER> <BUILD_TGZ>
  $0 enable_https <IP> <USER> <DOMAIN>"
  exit 1
fi

require_file() { [[ -f "$1" ]] || { echo "Missing file: $1"; exit 2; }; }

remote_exec() {
  ssh -o StrictHostKeyChecking=accept-new "${USER}@${IP}" "bash -s" -- <<'REMOTE_EOF'
set -euo pipefail
echo "[remote] connected OK"
REMOTE_EOF
}

case "$MODE" in
  setup)
    [[ -n "$IP" && -n "$USER" && -n "$DOMAIN" && -n "$BUILD" ]] || { echo "setup args missing"; exit 3; }
    require_file "$BUILD"

    echo "[local] Uploading build: $BUILD → ${USER}@${IP}:~/build.tgz"
    scp -q "$BUILD" "${USER}@${IP}:~/build.tgz"

    ssh -o StrictHostKeyChecking=accept-new "${USER}@${IP}" "bash -s" -- <<REMOTE_EOF
set -euo pipefail
APP_DIR="/var/www/nextapp"
ENV_FILE="\$APP_DIR/.env.production"
NGINX_SITE="/etc/nginx/sites-available/nextapp"

echo "[remote] 1) Base packages & Node 20"
sudo apt-get update -y
sudo apt-get install -y build-essential curl git nginx ca-certificates
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "[remote] 2) Swap (2G) if not exists"
if ! grep -q "/swapfile" /etc/fstab; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab >/dev/null
  sudo swapon -a
fi

echo "[remote] 3) Unpack artifacts to \$APP_DIR"
sudo mkdir -p "\$APP_DIR"
sudo chown -R ${USER}:${USER} "\$APP_DIR"
tar -xzf "\$HOME/build.tgz" -C "\$APP_DIR"

echo "[remote] 4) Detect standalone server.js"
SERVER_DIR=""
if [ -f "\$APP_DIR/.next/standalone/server.js" ]; then
  SERVER_DIR="\$APP_DIR/.next/standalone"
elif [ -f "\$APP_DIR/server.js" ]; then
  SERVER_DIR="\$APP_DIR"
else
  echo "ERROR: server.js not found (expected .next/standalone/server.js or root server.js)"; exit 10
fi

echo "[remote] 5) Env file (edit later if needed)"
if [ ! -f "\$ENV_FILE" ]; then
  cat > "\$ENV_FILE" <<'EOF_ENV'
NODE_ENV=production
PORT=3000
# NEXT_PUBLIC_*, API_URL, DB_URL ...
EOF_ENV
fi

echo "[remote] 6) systemd service"
sudo tee /etc/systemd/system/nextapp.service >/dev/null <<EOF_SVC
[Unit]
Description=Next.js App (standalone or custom server)
After=network.target

[Service]
Type=simple
User=${USER}
Group=${USER}
Environment=NODE_ENV=production
EnvironmentFile=${ENV_FILE}
WorkingDirectory=${SERVER_DIR}
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
LimitNOFILE=65535
# 메모리 최적화 - 모바일 호환성 개선
Environment=UV_THREADPOOL_SIZE=4
Environment=NODE_OPTIONS=--max-old-space-size=768

[Install]
WantedBy=multi-user.target
EOF_SVC

sudo systemctl daemon-reload
sudo systemctl enable nextapp
sudo systemctl restart nextapp
sleep 1
sudo systemctl --no-pager -l status nextapp || true

echo "[remote] 7) Nginx (HTTP with ACME webroot + www→apex)"
sudo tee "\$NGINX_SITE" >/dev/null <<'EOF_NGX'
# www -> apex (HTTP)
server {
    listen 80;
    server_name www.DOMAIN_PLACEHOLDER;
    return 301 http://DOMAIN_PLACEHOLDER$request_uri;
}

# apex (HTTP)
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER;

    # ACME challenge webroot
    location /.well-known/acme-challenge/ {
        root /var/www/nextapp/public;
        try_files $uri =404;
    }

    # Next static
    location /_next/static/ {
        alias /var/www/nextapp/.next/static/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri $uri/ =404;
    }

    # Next proxy
    location / {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:3000;
    }
}
EOF_NGX

# replace placeholder with actual domain (passed separately for safety)
sudo sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" "\$NGINX_SITE"

sudo ln -sf "\$NGINX_SITE" /etc/nginx/sites-enabled/nextapp
sudo rm -f /etc/nginx/sites-enabled/default || true
sudo nginx -t
sudo systemctl restart nginx

echo "[remote] 8) UFW open 80/443 (if ufw present)"
if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow OpenSSH || true
  sudo ufw allow 80 || true
  sudo ufw allow 443 || true
  sudo ufw --force enable || true
fi

echo "[remote] 9) Health checks"
curl -I http://127.0.0.1:3000/ || true
curl -I http://127.0.0.1/ || true

echo "[remote] Setup complete (HTTP). When DNS A(@, www) -> ${IP} is fully propagated, run 'enable_https' from local."
REMOTE_EOF
    ;;

  redeploy)
    [[ -n "$IP" && -n "$USER" && -n "$DOMAIN" ]] || true # DOMAIN not used here
    [[ -n "$BUILD" ]] || { echo "redeploy: need <BUILD_TGZ>"; exit 4; }
    require_file "$BUILD"

    echo "[local] Uploading new build: $BUILD"
    scp -q "$BUILD" "${USER}@${IP}:~/build.tgz"

    ssh -o StrictHostKeyChecking=accept-new "${USER}@${IP}" "bash -s" -- <<'REMOTE_EOF'
set -euo pipefail
APP_DIR="/var/www/nextapp"
echo "[remote] Redeploy: replace .next & public from build.tgz"
sudo rm -rf "\$APP_DIR/.next" "\$APP_DIR/public" || true
tar -xzf "\$HOME/build.tgz" -C "\$APP_DIR"
sudo chown -R ${USER}:${USER} "\$APP_DIR"
sudo systemctl restart nextapp
sudo nginx -t && sudo systemctl reload nginx
curl -I http://127.0.0.1/ || true
echo "[remote] Redeploy done."
REMOTE_EOF
    ;;

  enable_https)
    [[ -n "$IP" && -n "$USER" && -n "$DOMAIN" ]] || { echo "enable_https args missing"; exit 5; }

    echo "[local] Enabling HTTPS via certbot (webroot). Make sure DNS A(@, www) => ${IP} everywhere."
    ssh -o StrictHostKeyChecking=accept-new "${USER}@${IP}" "bash -s" -- <<'REMOTE_EOF'
set -euo pipefail
DOMAIN="${DOMAIN}"
APP_DIR="/var/www/nextapp"
NGINX_SITE="/etc/nginx/sites-available/nextapp"

echo "[remote] 1) Ensure ACME webroot exists"
sudo mkdir -p "\$APP_DIR/public/.well-known/acme-challenge"
echo ok | sudo tee "\$APP_DIR/public/.well-known/acme-challenge/probe.txt" >/dev/null
curl -s http://127.0.0.1/.well-known/acme-challenge/probe.txt | grep -q ok || { echo "ACME webroot probe failed"; exit 20; }

echo "[remote] 2) Install certbot"
sudo apt-get update -y
sudo apt-get install -y certbot python3-certbot-nginx

echo "[remote] 3) Issue certificate (webroot)"
sudo certbot certonly --non-interactive --agree-tos -m "admin@${DOMAIN}" \
  --webroot -w "\$APP_DIR/public" \
  -d "${DOMAIN}" -d "www.${DOMAIN}"

echo "[remote] 4) Switch Nginx to HTTPS"
sudo tee "\$NGINX_SITE" >/dev/null <<'EOF_SSL'
# Redirect all HTTP to HTTPS (both domains)
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
    return 301 https://DOMAIN_PLACEHOLDER$request_uri;
}

# www -> apex on HTTPS
server {
    listen 443 ssl http2;
    server_name www.DOMAIN_PLACEHOLDER;

    ssl_certificate     /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/privkey.pem;

    return 301 https://DOMAIN_PLACEHOLDER$request_uri;
}

# apex main (HTTPS)
server {
    listen 443 ssl http2;
    server_name DOMAIN_PLACEHOLDER;

    ssl_certificate     /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;

    # ACME (optional on HTTPS)
    location /.well-known/acme-challenge/ {
        root /var/www/nextapp/public;
        try_files $uri =404;
    }

    # Next static
    location /_next/static/ {
        alias /var/www/nextapp/.next/static/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri $uri/ =404;
    }

    # Proxy to Next
    location / {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:3000;
    }
}
EOF_SSL

sudo sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" "\$NGINX_SITE"
sudo nginx -t
sudo systemctl reload nginx

echo "[remote] 5) Open 443 on UFW (if present)"
if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow 443 || true
fi

echo "[remote] 6) Verify"
curl -I https://${DOMAIN} || true
curl -I https://www.${DOMAIN} || true

echo "[remote] HTTPS enabled. Auto-renew is handled by certbot.timer; you can test with: 'sudo certbot renew --dry-run'"
REMOTE_EOF
    ;;

  *)
    echo "Unknown mode: $MODE"
    exit 9
    ;;
esac
