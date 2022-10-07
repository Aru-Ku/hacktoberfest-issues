# SOURCE: https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl

# Install dependencies only when needed
FROM node:slim AS deps

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:slim AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN=APP_NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN npm run build

# Production image, copy all the files and run next
FROM node:slim AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

RUN npx next telemetry disable

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "run", "serve"]
