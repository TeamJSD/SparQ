import fs from 'fs';
import Fixture from './../fixture/postcall_fixture.js';

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

let dependencies = `import Sequelize from 'sequelize';
import _ from 'lodash';\n\n`

let connection = `const Conn = new Sequelize(
  '${Fixture.DBName}', //name of users individual db.
  '${Fixture.userID}', // username
  '${Fixture.UserPassword}', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);\n\n`

function createDBFile() {
  //create db file and append dep block. 
  fs.writeFile(`${Fixture.userID}_db.js`, dependencies, (err) => {
    if (err) { console.log(err) }
    //append connection template block to db file. 
    fs.appendFile(`${Fixture.userID}_db.js`, connection, (err) => {
      if (err) { console.log(err) }

      //append schema block
      fs.appendFile(`${Fixture.userID}_db.js`, createTablesBlock(Fixture.tables), (err) => {
        if (err) { console.log(err) }

        //append relationships and exports
        fs.appendFile(`${Fixture.userID}_db.js`, Fixture.relationshipsString + `\nexport default Conn;`, (err) => {
          if (err) { console.log(err) };

        });
      });
    });
  })
};

export default createDBFile