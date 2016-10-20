import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/z1y2x3_db.js';

const Book = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a Book',
  fields: () => {
    return {
title: {
      type: GraphQLString,
      resolve(book) {
        return book.title;
}
    },
author: {
      type: GraphQLString,
      resolve(book) {
        return book.author;
}
    },

}
  }
});

const Booklet = new GraphQLObjectType({
  name: 'Booklet',
  description: 'This represents a Booklet',
  fields: () => {
    return {
Title: {
      type: GraphQLString,
      resolve(booklet) {
        return booklet.Title;
}
    },
Content: {
      type: GraphQLString,
      resolve(booklet) {
        return booklet.Content;
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
   book: { 
          type: new GraphQLList(Book),
          resolve(root, args) {
            return Db.models.book.findAll({ where: args });
          }
        },booklet: { 
          type: new GraphQLList(Booklet),
          resolve(root, args) {
            return Db.models.booklet.findAll({ where: args });
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
 addBook: {
        type: Book,
        args: {
 title: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },author: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.book.create({
          title: args.title,author: args.author,
          });
        }}, 
 addBooklet: {
        type: Booklet,
        args: {
 Title: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Content: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.booklet.create({
          Title: args.Title,Content: args.Content,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;