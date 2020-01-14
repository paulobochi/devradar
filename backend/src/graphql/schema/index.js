const { GraphQLSchema } = require('graphql');

const RootQueryType = require('../queries/root');
const mutations = require('../mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
