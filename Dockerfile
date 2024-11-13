# Development
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN npx ci

COPY --chown=node:node . .

USER node

# Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

RUN npx ci --only-production && yarn cache clean

USER node

# Production
FROM node:20-alpine AS production

ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node entrypoint.sh ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node certs ./certs

EXPOSE 3000