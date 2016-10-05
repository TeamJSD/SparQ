const fs = require('fs');
const Fixture = require('./../fixture/postcall_fixture.js')

// console.log(Fixture);

let dependencies = `import Sequelize from 'sequelize';
import _ from 'lodash';

`

let connection = `new Sequelize(
  '${Fixture.DBName}', //name of users individual db.
  '${Fixture.userID}', // username
  '${Fixture.UserPassword}', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);
`

// console.log(connection);

function dupeTempDB() {
  //create db file and append dep block. 
  fs.writeFile(`${Fixture.userID}_db.js`, dependencies, (err) => {
    if (err) { console.log(err) }
    //append connection template block to db file. 
    fs.appendFile(`${Fixture.userID}_db.js`, connection, (err) => {
      if (err) { console.log(err) }
      //
      fs.appendFile(`${Fixture.userID}_db.js`, connection, (err) => {
        if (err) { console.log(err) }
      });
    });
  });
};

dupeTempDB();