const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const axios = require('axios');
const mongoose = require("mongoose");

const Dev = mongoose.model('dev');
const DevType = require('../types/dev');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDev: {
      type: DevType,
      args: {
        name: { type: GraphQLString },
        github_username: { type: GraphQLString },
        technologies: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parentValue, { name, github_username, technologies }) {
        const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        const { avatar_url, bio} = githubResponse.data;

        return new Dev({
          name,
          github_username,
          bio,
          avatar_url,
          technologies
        }).save();
      }
    },
    deleteDev: {
      type: DevType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Dev.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
