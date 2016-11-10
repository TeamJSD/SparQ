import fs from 'fs';
import dbTransMethods from './db_transpiler_methods.js';

function createDBFile(userDefinedSchema) {
  //create db file and append dependency block. 
  fs.writeFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, dbTransMethods.createDependenciesblock(userDefinedSchema), (err) => {
    if (err) { console.log(err) }
    //append connection template block to db file. 
    fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, dbTransMethods.createConnectionsBlock(userDefinedSchema), (err) => {
      if (err) { console.log(err) }
      //append schema block to db file. 
      fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, dbTransMethods.createTablesBlock(userDefinedSchema.tables), (err) => {
        if (err) { console.log(err) }
        //append relationships if defined by user.
        if (userDefinedSchema.hasRelationships) {
          fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, userDefinedSchema.relationshipsString + `\nConn.sync({ force: true }).then(function(err) { console.log('It worked!'); }, function (err) { console.log('An error occurred while creating the table:', err); });\nexport default Conn;`, (err) => {
            if (err) { console.log(err) };
          });
          //if no relationships exist. 
        } else {
          fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, `\nConn.sync({ force: true }).then(function(err) { console.log('database created'); }, function (err) { console.log('An error occurred while creating the database:', err); });\nexport default Conn;`, (err) => {
            if (err) { console.log(err) };
          });
        }
      });
    });
  })
};

export default createDBFile