const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const Dev = mongoose.model('dev');
const DevType = require('../types/dev');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    devs: {
      type: new GraphQLList(DevType),
      resolve() {
        return Dev.find({});
      }
    },
    dev: {
      type: DevType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Dev.findById(id);
      }
    },
  })
});

module.exports = RootQuery;
