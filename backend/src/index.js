require('./models');

const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');
const schema = require('./graphql/schema');

const MONGO_URI = 'mongodb://db:27017/devradar';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(express.json());
app.use(cors());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

server.listen(3333);
