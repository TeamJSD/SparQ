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

const Users = new GraphQLObjectType({
  name: 'Users',
  description: 'This represents a Users',
  fields: () => {
    return {
Name: {
      type: GraphQLString,
      resolve(users) {
        return users.Name;
}
    },
Age: {
      type: GraphQLInt,
      resolve(users) {
        return users.Age;
}
    },

}
  }
});

const Posts = new GraphQLObjectType({
  name: 'Posts',
  description: 'This represents a Posts',
  fields: () => {
    return {
Title: {
      type: GraphQLString,
      resolve(posts) {
        return posts.Title;
}
    },
Content: {
      type: GraphQLString,
      resolve(posts) {
        return posts.Content;
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
   users: { 
          type: new GraphQLList(Users),
          resolve(root, args) {
            return Db.models.users.findAll({ where: args });
          }
        },posts: { 
          type: new GraphQLList(Posts),
          resolve(root, args) {
            return Db.models.posts.findAll({ where: args });
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
 addUsers: {
        type: Users,
        args: {
 Name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Age: {
 type: new GraphQLNonNull 
 (GraphQLInt),
 },},
        resolve(_, args) {
          return Db.models.users.create({
          Name: args.Name,Age: args.Age,
          });
        }}, 
 addPosts: {
        type: Posts,
        args: {
 Title: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Content: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.posts.create({
          Title: args.Title,Content: args.Content,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;