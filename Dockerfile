FROM registry.tsl.io/node/node:18.11.0 AS dependencies

LABEL name="Baseapp Webapp" version="2.0.0"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --audit


FROM dependencies AS dev-dependencies
RUN yarn install --production=false --frozen-lockfile --prefer-offline 


FROM dev-dependencies AS lint
CMD ["yarn", "lint"]

FROM dev-dependencies AS test
CMD ["yarn", "test"]


FROM registry.tsl.io/node/node:18.11.0 AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules


FROM registry.tsl.io/node/node:18.11.0 AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

USER node
EXPOSE 3000
ENV PORT 3000
