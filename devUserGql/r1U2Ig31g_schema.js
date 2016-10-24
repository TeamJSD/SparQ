import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/r1U2Ig31g_db.js';

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

const Test = new GraphQLObjectType({
  name: 'Test',
  description: 'This represents a Test',
  fields: () => {
    return {
test: {
      type: GraphQLString,
      resolve(test) {
        return test.test;
}
    },

}
  }
});

const test2 = new GraphQLObjectType({
  name: 'test2',
  description: 'This represents a test2',
  fields: () => {
    return {
name: {
      type: GraphQLString,
      resolve(test2) {
        return test2.name;
}
    },
 person: {
        type: new GraphQLList(Person),
        resolve(test2) {
          return test2.getPersons();
        }
      }
}
  }
});

const Test3 = new GraphQLObjectType({
  name: 'Test3',
  description: 'This represents a Test3',
  fields: () => {
    return {
test: {
      type: GraphQLString,
      resolve(test3) {
        return test3.test;
}
    },
 post: {
        type: new GraphQLList(Post),
        resolve(test3) {
          return test3.getPosts();
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
        },test: { 
          type: new GraphQLList(Test),
          resolve(root, args) {
            return Db.models.test.findAll({ where: args });
          }
        },test2: { 
          type: new GraphQLList(test2),
          resolve(root, args) {
            return Db.models.test2.findAll({ where: args });
          }
        },test3: { 
          type: new GraphQLList(Test3),
          resolve(root, args) {
            return Db.models.test3.findAll({ where: args });
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
 addPost: {
        type: Post,
        args: {
 Title: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },Content: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.post.create({
          Title: args.Title,Content: args.Content,
          });
        }}, 
 addTest: {
        type: Test,
        args: {
 test: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.test.create({
          test: args.test,
          });
        }}, 
 addtest2: {
        type: test2,
        args: {
 name: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.test2.create({
          name: args.name,
          });
        }}, 
 addTest3: {
        type: Test3,
        args: {
 test: {
 type: new GraphQLNonNull 
 (GraphQLString),
 },},
        resolve(_, args) {
          return Db.models.test3.create({
          test: args.test,
          });
        }}, }}
})

const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});
export default Schema;