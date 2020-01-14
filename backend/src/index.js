require("./models");

const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const schema = require("./graphql/schema");

const MONGO_URI = 'mongodb://db:27017/devradar';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(express.json());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(3333);
