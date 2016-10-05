const {
  graphql,
  buildSchema
} = require('graphql');
let test1 = {};

test1.schema = buildSchema(`
  type Query {
    hello: String
  }
`);

test1.root = { hello: () => 'Hello world!' };

module.exports = test1;
