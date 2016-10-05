import fs from 'fs';

let dependencies = `
import Sequelize from 'sequelize';
import _ from 'lodash';
`

let connection = `new Sequelize(
  '${dbname}', //name of users individual db.
  '${username}', // username
  '${password}', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);`

// function dupeTempDB() {
//   fs.createReadStream('./templates/db_template.js').pipe(fs.createWriteStream(`${Fixture.userID}_db.js`))
// };

// dupeTempDB();