FROM node:lts-alpine3.11 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine3.11
WORKDIR /app
COPY --from=builder /app/build ./
RUN yarn add global serve
CMD ["yarn", "serve", "-s", "-p", "3000"]