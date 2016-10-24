import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/Hy5-2AiJx_db.js';

const Derrick = new GraphQLObjectType({
  name: 'Derrick',
  description: 'This represents a Derrick',
  fields: () => {
    return {
Name: {
      type: GraphQLString,
      resolve(derrick) {
        return derrick.Name;
}
    },

}
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
   derrick: { 
          type: new GraphQLList(Derrick),
          resolve(root, args) {
            return Db.models.derrick.findAll({ where: args });
          }
        },
    }
  }
});

const Mutation = new GraphQLObjectType({
name: 'Mutation',
description: 'This is a mutation, functions that create things',
fields() {
return {
 addDerrick: {
        type: Derrick,
        args: {
 Name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.derrick.create({
          Name: args.Name,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;