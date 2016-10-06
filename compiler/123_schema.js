import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './db;

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
email: {
      type: GraphQLString,
      resolve(person) {
        return person.email;
      }
    },
firstName: {
      type: GraphQLString,
      resolve(person) {
        return person.firstName;
      }
    },
age: {
      type: GraphQLInt,
      resolve(person) {
        return person.age;
      }
    },
}
  }
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a Post',
  fields: () => {
    return {
Title: {
      type: GraphQLString,
      resolve(post) {
        return post.Title;
      }
    },
Content: {
      type: GraphQLString,
      resolve(post) {
        return post.Content;
      }
    },
}
  }
});

