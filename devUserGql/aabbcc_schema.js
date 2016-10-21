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
      type: GraphQLInt,
      resolve(derrick) {
        return derrick.Name;
}
    },
true: {
      type: undefined,
      resolve(derrick) {
        return derrick.true;
}
    },
Ethnicity: {
      type: GraphQLString,
      resolve(derrick) {
        return derrick.Ethnicity;
}
    },
false: {
      type: undefined,
      resolve(derrick) {
        return derrick.false;
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
 (GraphQLInt),
 },true: {
 type: new GraphQLNonNull 
 (undefined),
 },Ethnicity: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },false: {
 type: new GraphQLNonNull 
 (undefined),
 },},
        resolve(_, args) {
          return Db.models.derrick.create({
          Name: args.Name,true: args.true,Ethnicity: args.Ethnicity,false: args.false,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;