import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/123abc_db.js';

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
      },
      post: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          return Db.models.post.findAll({ where: args });
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
      addPerson: {
        type: Person,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          age: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(_, args) {
          return Db.models.person.create({
            email: args.email,
            firstName: args.firstName,
            age: args.age,
          });
        }
      },
      addPost: {
        type: Post,
        args: {
          Title: {
            type: new GraphQLNonNull(GraphQLString),
          },
          Content: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args) {
          return Db.models.post.create({
            Title: args.Title,
            Content: args.Content,
          });
        }
      },
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
export default Schema;