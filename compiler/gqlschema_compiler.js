import fs from 'fs';
import _ from 'lodash';

let dependencies = `import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './db';\n\n`

//GQL Schema Builder
let GQLDBSchema = function(userSchema) {
  let output = '';
  userSchema.tables.forEach((element, index, array) => {
    output = output + GQLSchemaTableBlock(userSchema, element);
  });
  return output;
};

let GQLSchemaTableBlock = function(userSchema, table) {

  let defineBlock = `const ${table.tableName} = new GraphQLObjectType({
  name: '${table.tableName}',
  description: 'This represents a ${table.tableName}',
  fields: () => {
    return {\n${GQLSchemaFieldsBlock(userSchema,table.fields,table.tableName)}}
  }
});\n\n`
  return defineBlock;
};

let GQLSchemaFieldsBlock = function(userSchema, fieldArr, tableName) {
  ///////NOTE: ID is not included because not sure how to query ID from DB. Also thinking this might not be necessary for DB. 

  //compile relationship block
  let relationshipFieldBlock = ``;

  if (userSchema.hasRelationships) {
    userSchema.relationships.forEach((element, index, array) => {
      if (tableName === element.Master) {
        relationshipFieldBlock = GQLSchemaRelationsBlock(element);
      }
    });
  };

  let output = '';
  fieldArr.forEach((element, index, array) => {

    let GQLType = {
      "STRING": "GraphQLString",
      "INTEGER": "GraphQLInt",
      "BOOLEAN": "GraphQLBoolean",
    };
    output = output + `${element.fieldName}: {
      type: ${GQLType[element.type]},
      resolve(${tableName.toLowerCase()}) {
        return ${tableName.toLowerCase()}.${element.fieldName};
}
    },\n`
  });
  return output + relationshipFieldBlock + `\n`;
};

//compile relationship block
let GQLSchemaRelationsBlock = function(rels) {
  return ` ${rels.Slave.toLowerCase()}: {
        type: new GraphQLList(${rels.Slave}),
        resolve(${rels.Master.toLowerCase()}) {
          return ${rels.Master.toLowerCase()}.get${rels.Slave}s();
        }
      }`
};

//GQL Query Builder
let GQLQueryBlock = function(data) {
  let QueryBlock = `const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
   ${GQLQueryTablesBlock(data.tables)}
    }
  }
});\n\n`;

  return QueryBlock
};

let GQLQueryTablesBlock = function(tables) {
  let output = '';
  tables.forEach((element, index, array) => {
    output = output + `${element.tableName.toLowerCase()}: { 
          type: new GraphQLList(${element.tableName}),
          resolve(root, args) {
            return Db.models.${element.tableName.toLowerCase()}.findAll({ where: args });
          }
        },`
  });
  return output
};

//Write to file.
function createSchemaFile(userSchema) {

  //create schema file and append dep block. 
  fs.writeFile(`${userSchema.userID}_schema.js`, dependencies, (err) => {
    if (err) { console.log(err) }

    fs.appendFile(`${userSchema.userID}_schema.js`, GQLDBSchema(userSchema), (err) => {
      if (err) { console.log(err) }

      fs.appendFile(`${userSchema.userID}_schema.js`, GQLQueryBlock(userSchema), (err) => {
        if (err) { console.log(err) }

        fs.appendFile(`${userSchema.userID}_schema.js`, `const Schema = new GraphQLSchema({
  query: Query});\n
export default Schema;`, (err) => {
          if (err) { console.log(err) }

        });

      });
    });
  });
};

export default createSchemaFile