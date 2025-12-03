# install dependencies
FROM oven/bun:alpine
WORKDIR /app

COPY packages/api/package.json .
RUN bun install --production

COPY packages/api/prisma/schema.prisma ./prisma/schema.prisma
COPY packages/api/prisma/migrations ./prisma/migrations
COPY packages/api/dist/server.js .
COPY packages/front-end/dist ./client

ENTRYPOINT ["bun", "run", "start"]
