# Docker
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml* ./
COPY .yarn/ ./.yarn/

RUN corepack enable && corepack prepare yarn@4.9.2 --activate \
  && yarn -v

RUN yarn install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 환경변수 직접 설정 (빌드 인자 대신)
ENV NEXT_PUBLIC_SUPABASE_URL=https://cgojadkcijfvmmxmstyq.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2phZGtjaWpmdm1teG1zdHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzY1NjEsImV4cCI6MjA3Mjk1MjU2MX0.A8oe-xek9kTKcM5vx6H3-8mhffQNfIQU_LGh2Xq6KXc

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# CSS 빌드를 위한 환경 변수 추가
ENV TAILWIND_MODE=build
ENV NEXT_PUBLIC_TAILWIND_MODE=build
RUN yarn build

# 4) runner (standalone)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV TAILWIND_MODE=build
# 비루트 유저
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
 
# 정적/런타임 파일 복사 - 순서와 권한 개선
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# 추가 정적 파일 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
