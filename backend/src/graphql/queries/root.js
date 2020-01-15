const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString,
} = require('graphql');

const Dev = mongoose.model('dev');
const DevType = require('../types/dev');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    devs: {
      type: new GraphQLList(DevType),
      args: {
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        technologies: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, { latitude, longitude, technologies }) {
        const filters = {};

        if (latitude && longitude) {
          filters.location = {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 10000,
            },
          };
        }

        if (technologies && technologies.length > 0) {
          filters.technologies = {
            $in: technologies,
          };
        }

        return Dev.find(filters);
      },
    },
    dev: {
      type: DevType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Dev.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
