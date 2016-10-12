import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import sparqDb from './sparqDb.js';

const DevUser = new GraphQLObjectType({
  name: 'devUser',
  description: 'this represents a devUser',
  fields: () => {
    return {
      username: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.username
        }
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query', 
  description: 'this is a root query',
  fields: () => {
    return {
      devUser: {
        type: new GraphQLList(DevUser),
        resolve(root, args) {
          return sparqDb.models.devUser.findAll({where: args});
        }
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;