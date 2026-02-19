# Admin Next.js App Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files and yarn config for node-modules mode
COPY package.json .yarnrc.yml ./

# Enable corepack and install yarn 4.9.2
RUN corepack enable && corepack prepare yarn@4.9.2 --activate \
  && yarn -v

# Install dependencies (will use node-modules linker from .yarnrc.yml)
RUN yarn install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy admin source code
COPY . .

# Set build environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Supabase 환경 변수 설정
ENV NEXT_PUBLIC_SUPABASE_URL=https://cgojadkcijfvmmxmstyq.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzY1NjEsImV4cCI6MjA3Mjk1MjU2MX0.A8oe-xek9kTKcM5vx6H3-8mhffQNfIQU_LGh2Xq6KXc
ENV NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzM3NjU2MSwiZXhwIjoyMDcyOTUyNTYxfQ.SGaQBOaHpfVUzAkxHpOHXPTvn-9gKtEvzxUZrIltlAE

# Build the admin app
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Supabase 환경 변수를 런타임에도 설정
ENV NEXT_PUBLIC_SUPABASE_URL=https://cgojadkcijfvmmxmstyq.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzY1NjEsImV4cCI6MjA3Mjk1MjU2MX0.A8oe-xek9kTKcM5vx6H3-8mhffQNfIQU_LGh2Xq6KXc
ENV NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzM3NjU2MSwiZXhwIjoyMDcyOTUyNTYxfQ.SGaQBOaHpfVUzAkxHpOHXPTvn-9gKtEvzxUZrIltlAE

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public directory if needed
# COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
