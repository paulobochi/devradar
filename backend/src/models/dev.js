const mongoose = require("mongoose");
const PointSchema = require("./point");

const DevSchema = new mongoose.Schema({
  name: String,
  bio: String,
  github_username: String,
  avatar_url: String,
  technologies: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

mongoose.model('dev', DevSchema);