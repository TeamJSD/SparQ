import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './db';

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
 post: {
        type: new GraphQLList(Post),
        resolve(person) {
          return person.getPosts();
        }
      }
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
 person: {
        type: new GraphQLList(Person),
        resolve(post) {
          return post.getPersons();
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
   person: { 
          type: new GraphQLList(Person),
          resolve(root, args) {
            return Db.models.person.findAll({ where: args });
          }
        },post: { 
          type: new GraphQLList(Post),
          resolve(root, args) {
            return Db.models.post.findAll({ where: args });
          }
        },
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query});

export default Schema;