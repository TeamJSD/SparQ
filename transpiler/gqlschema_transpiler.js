import fs from 'fs';
import _ from 'lodash';

let GQLDepBuilder = function(userID) {
  return `import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './../devUserDbs/${userID}_db.js';\n\n`
};

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

//GQL Mutation Builder

let GQLMutationArgsFieldBuilder = function(fields) {
  let fieldsBlock = ``;
  let GQLType = {
    "STRING": "GraphQLString",
    "INTEGER": "GraphQLInt",
    "BOOLEAN": "GraphQLBoolean",
  };

  fields.forEach(function(element) {
    fieldsBlock += `${element.fieldName}: {\n type: new GraphQLNonNull \n (${GQLType[element.type]}),\n },`
  });

  return fieldsBlock;
};

let GQLMutationResolverBuilder = function(table) {
  let resolverFields = ``;
  table.fields.forEach(function(element) {
    resolverFields += `${element.fieldName}: args.${element.fieldName},`
  });

  let resolverBlock = `resolve(_, args) {
          return Db.models.${table.tableName.toLowerCase()}.create({
          ${resolverFields}
          });
        }`;

  return resolverBlock;
};

//Mutation outter block
let GQLMutationBlock = function(userSchema) {
  let tables = ``;
  userSchema.tables.forEach(function(element) {
    tables += `\n add${element.tableName}: {
        type: ${element.tableName},
        args: {\n ${GQLMutationArgsFieldBuilder(element.fields)}},
        ${GQLMutationResolverBuilder(element)}}, `
  });

  let mutationBlock = `const Mutation = new GraphQLObjectType({\nname: 'Mutation',\ndescription: 'This is a mutation, functions that create things',\nfields() {\nreturn {${tables}}}\n})`

  return mutationBlock;
};

//Write to file.
function createSchemaFile(userSchema) {

  //create schema file and append dep block. 
  fs.writeFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLDepBuilder(userSchema.userID), (err) => {
    if (err) { console.log(err) }

    //create DB schema and append to file. 
    fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLDBSchema(userSchema), (err) => {
      if (err) { console.log(err) }

      //create GQL query and append to file. 
      fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLQueryBlock(userSchema), (err) => {
        if (err) { console.log(err) }

        //create GQL mutation and append to file. 
        fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, `${GQLMutationBlock(userSchema)}\n\n`, (err) => {
          if (err) { console.log(err) }

          //create  export block and append to file.         
          fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, `const Schema = new GraphQLSchema({
  query: Query, mutation: Mutation});\nexport default Schema;`, (err) => {
            if (err) { console.log(err) }
          });
        });

      });
    });
  });
};

export default createSchemaFile