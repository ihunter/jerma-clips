FROM node:22.18.0-slim AS base

ARG PORT=8080
ENV PORT=$PORT
ENV NODE_ENV=production
WORKDIR /usr/src/app

FROM base AS build
# Install build dependencies that might be needed for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY --link package.json package-lock.json ./

RUN npm ci --include=dev --prefer-offline --no-audit

COPY --link . .

RUN npm run build

FROM base
# Create non-root user for security
RUN groupadd --gid 1001 --system nodejs && \
    useradd --uid 1001 --system --gid nodejs nodejs

# Install only production runtime dependencies if needed
RUN apt-get update && apt-get install -y \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build --chown=nodejs:nodejs /usr/src/app/.output /usr/src/app/.output

# Switch to non-root user
USER nodejs

EXPOSE $PORT

ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", ".output/server/index.mjs" ]