import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/BkdpS0oJg_db.js';

const Derrick = new GraphQLObjectType({
  name: 'Derrick',
  description: 'This represents a Derrick',
  fields: () => {
    return {
name: {
      type: GraphQLString,
      resolve(derrick) {
        return derrick.name;
}
    },

}
  }
});

const Tst = new GraphQLObjectType({
  name: 'Tst',
  description: 'This represents a Tst',
  fields: () => {
    return {
test: {
      type: GraphQLString,
      resolve(tst) {
        return tst.test;
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
        },tst: { 
          type: new GraphQLList(Tst),
          resolve(root, args) {
            return Db.models.tst.findAll({ where: args });
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
 name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.derrick.create({
          name: args.name,
          });
        }}, 
 addTst: {
        type: Tst,
        args: {
 test: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.tst.create({
          test: args.test,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;