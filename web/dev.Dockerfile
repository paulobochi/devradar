FROM node:lts-alpine3.11
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn relay
RUN export GRAPHQL_URL=http://localhost:3333/graphql
CMD ["npm", "run", "start"]