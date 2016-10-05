import Sequelize from 'sequelize';
import _ from 'lodash';

new Sequelize(
  'DBNAME123ABC', //name of users individual db.
  '123', // username
  'ABC', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);
