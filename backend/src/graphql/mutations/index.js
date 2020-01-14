const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLList, 
  GraphQLFloat,
} = require("graphql");
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
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
      },
      async resolve(parentValue, { name, github_username, technologies, latitude, longitude }) {
        const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        const { avatar_url, bio} = githubResponse.data;

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }

        return new Dev({
          name,
          github_username,
          bio,
          avatar_url,
          technologies,
          location
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
