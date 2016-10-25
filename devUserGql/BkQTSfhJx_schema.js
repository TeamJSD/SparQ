import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/BkQTSfhJx_db.js';

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
Name: {
      type: GraphQLString,
      resolve(person) {
        return person.Name;
}
    },
Age: {
      type: GraphQLInt,
      resolve(person) {
        return person.Age;
}
    },
 hasmany: {
        type: new GraphQLList(hasMany),
        resolve(person) {
          return person.gethasManys();
        }
      }
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

const Friends = new GraphQLObjectType({
  name: 'Friends',
  description: 'This represents a Friends',
  fields: () => {
    return {
Name: {
      type: GraphQLString,
      resolve(friends) {
        return friends.Name;
}
    },
ID: {
      type: undefined,
      resolve(friends) {
        return friends.ID;
}
    },
 belongstomany: {
        type: new GraphQLList(belongsToMany),
        resolve(friends) {
          return friends.getbelongsToManys();
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
        },posts: { 
          type: new GraphQLList(Posts),
          resolve(root, args) {
            return Db.models.posts.findAll({ where: args });
          }
        },friends: { 
          type: new GraphQLList(Friends),
          resolve(root, args) {
            return Db.models.friends.findAll({ where: args });
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
 Name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Age: {
 type: new GraphQLNonNull 
 (GraphQLInt),
 },},
        resolve(_, args) {
          return Db.models.person.create({
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
        }}, 
 addFriends: {
        type: Friends,
        args: {
 Name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },ID: {
 type: new GraphQLNonNull 
 (undefined),
 },},
        resolve(_, args) {
          return Db.models.friends.create({
          Name: args.Name,ID: args.ID,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;