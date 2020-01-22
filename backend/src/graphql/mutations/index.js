const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
} = require('graphql');
const axios = require('axios');
const mongoose = require('mongoose');

const Dev = mongoose.model('dev');
const DevType = require('../types/dev');

const { sendMessageToAll, sendNewDevMessage } = require('../../websocket');
const parseStringAsArray = require('../../utils/parseStringAsArray');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDev: {
      type: DevType,
      args: {
        githubUsername: { type: GraphQLString },
        technologies: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
      },
      async resolve(parentValue, {
        githubUsername, technologies, latitude, longitude,
      }) {
        let dev = await Dev.findOne({ githubUsername });

        if (!dev) {
          const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);
          const { name, bio } = githubResponse.data;

          const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
          };

          dev = await Dev.create({
            name,
            githubUsername,
            bio,
            avatarUrl: githubResponse.data.avatar_url,
            technologies: parseStringAsArray(technologies),
            location,
          });

          sendNewDevMessage(dev);
        }

        return dev;
      },
    },
    deleteDev: {
      type: DevType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Dev.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;
