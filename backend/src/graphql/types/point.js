const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} = graphql;

const PointType = new GraphQLObjectType({
  name: 'PointType',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) },
  }),
});

module.exports = PointType;
