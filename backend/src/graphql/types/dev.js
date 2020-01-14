const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;
const PointType = require('./point');

const DevType = new GraphQLObjectType({
  name:  'DevType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    github_username: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    technologies: { type: new GraphQLList(GraphQLString), },
    location: { type: PointType },
  })
});

module.exports = DevType;
