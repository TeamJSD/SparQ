import fs from 'fs';
// import Fixture from './../fixture/postcall_fixture.js';

let createTablesBlock = function(tables) {
  let output = '';
  tables.forEach((element, index, array) => {
    output = output + createaTable(element);
  });
  return output;
};

let createaTable = function(table) {
  let defineBlock = `const ${table.tableName} = Conn.define('${table.tableName.toLowerCase()}', {\n${createFieldsBlock(table.fields)}});\n\n`
  return defineBlock;
};

let createFieldsBlock = function(fieldArr) {
  let output = '';
  fieldArr.forEach((element, index, array) => {
    output = output + `${element.fieldName}: {
      type: Sequelize.${element.type},
      allowNull: ${!element.required}
    },\n`
  });
  return output
};

let createDependenciesblock = function(userDefinedSchema) {
  return `import Sequelize from 'sequelize';
import _ from 'lodash';\n\n`
};

let createConnectionsBlock = function(userDefinedSchema) {
  return `const Conn = new Sequelize(
  '${userDefinedSchema.userID}', //name of users individual db.
  null, //replace later with process.env.NODE_DBUSERNAME,
  null //replace later with process.env.NODE_DBPASSWORD
  , { 
    dialect: 'postgres', //always postgres
    host: process.env.NODE_DBHOST
  }
);\n\n`
};

function createDBFile(userDefinedSchema) {
  //create db file and append dep block. 
  fs.writeFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, createDependenciesblock(userDefinedSchema), (err) => {
    if (err) { console.log(err) }
    //append connection template block to db file. 
    fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, createConnectionsBlock(userDefinedSchema), (err) => {
      if (err) { console.log(err) }

      //append schema block
      fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, createTablesBlock(userDefinedSchema.tables), (err) => {
        if (err) { console.log(err) }

        //append relationships and exports if relationships was defined.
        if (userDefinedSchema.hasRelationships) {
          fs.appendFile(__dirname + `/../devUserDbs/${userDefinedSchema.userID}_db.js`, userDefinedSchema.relationshipsString + `\nConn.sync({ force: true }).then(function(err) { console.log('It worked!'); }, function (err) { console.log('An error occurred while creating the table:', err); });\nexport default Conn;`, (err) => {
            if (err) { console.log(err) };
          });
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