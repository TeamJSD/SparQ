import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/aabbcc_db.js';

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
Email: {
      type: GraphQLString,
      resolve(derrick) {
        return derrick.Email;
}
    },
Age: {
      type: GraphQLInt,
      resolve(derrick) {
        return derrick.Age;
}
    },
 steve: {
        type: new GraphQLList(Steve),
        resolve(derrick) {
          return derrick.getSteves();
        }
      }
}
  }
});

const Steve = new GraphQLObjectType({
  name: 'Steve',
  description: 'This represents a Steve',
  fields: () => {
    return {
Dicksize: {
      type: GraphQLInt,
      resolve(steve) {
        return steve.Dicksize;
}
    },
 derrick: {
        type: new GraphQLList(Derrick),
        resolve(steve) {
          return steve.getDerricks();
        }
      }
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
        },steve: { 
          type: new GraphQLList(Steve),
          resolve(root, args) {
            return Db.models.steve.findAll({ where: args });
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
 },Email: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Age: {
 type: new GraphQLNonNull 
 (GraphQLInt),
 },},
        resolve(_, args) {
          return Db.models.derrick.create({
          Name: args.Name,Email: args.Email,Age: args.Age,
          });
        }}, 
 addSteve: {
        type: Steve,
        args: {
 Dicksize: {
 type: new GraphQLNonNull 
 (GraphQLInt),
 },},
        resolve(_, args) {
          return Db.models.steve.create({
          Dicksize: args.Dicksize,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;