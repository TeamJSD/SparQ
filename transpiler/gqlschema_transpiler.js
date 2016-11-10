import fs from 'fs';
import _ from 'lodash';
import GQLTransMethods from './gqlschema_transpiler_methods.js';

//Write to file.
function createSchemaFile(userSchema) {
  //create schema file and append dep block. 
  fs.writeFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLTransMethods.GQLDepBuilder(userSchema.userID), (err) => {
    if (err) { console.log(err) }
    //create DB schema block and append to file. 
    fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLTransMethods.GQLDBSchema(userSchema), (err) => {
      if (err) { console.log(err) }
      //create GQL query and append to file. 
      fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, GQLTransMethods.GQLQueryBlock(userSchema), (err) => {
        if (err) { console.log(err) }
        //create GQL mutation and append to file. 
        fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, `${GQLTransMethods.GQLMutationBlock(userSchema)}\n\n`, (err) => {
          if (err) { console.log(err) }
          //create  export block and append to file.         
          fs.appendFile(__dirname + `/../devUserGql/${userSchema.userID}_schema.js`, `const Schema = new GraphQLSchema({ query: Query, mutation: Mutation});\nexport default Schema;`, (err) => {
            if (err) { console.log(err) }
          });
        });

      });
    });
  });
};

export default createSchemaFile