const {
  graphql,
  buildSchema
} = require('graphql');
let test2 = {};

test2.schema = buildSchema(`
  type Query {
    hello: String
  }
`);

test2.root = { hello: () => 'this is test2!' };

module.exports = test2;
