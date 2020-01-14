FROM node:lts-alpine3.11
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["npm", "run", "dev"]