const mongoose = require("mongoose");

const DevSchema = new mongoose.Schema({
    name: String,
    bio: String,
    github_username: String,
    avatar_url: String,
    technologies: [String],
});

module.exports = mongoose.model('dev', DevSchema);