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
      },
      //may need to rethink this...
      password: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.password
        }
      },
      devId: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.devId
        }
      },
      dbName: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.dbName
        }
      },
      dbUsername: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.dbUsername
        }
      },
      dbPassword: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.dbPassword
        }
      },
      gqlSchemaPath: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.gqlSchemaPath
        }
      },
      schemaModel: {
        type: GraphQLString,
        resolve(devUser) {
          return devUser.schemaModel
        }
      }
    }
  }
})
//defend against stuff in resolve function... like trying to create 
//new users...
const Mutation = new GraphQLObjectType({
  name: 'Mutation', 
  description: 'Functions to create stuff',
  fields() {
    return {
      addDevUser: {
        type: DevUser,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          devId: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return sparqDb.models.devUser.create({
            username: args.username,
            password: args.password,
            devId: args.devId
          })
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
  query: Query,
  mutation: Mutation
});

export default Schema;