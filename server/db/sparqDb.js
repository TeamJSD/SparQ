const Sequelize = require('sequelize');
const faker = require('faker');
const testFixture = require('../../fixture/postcall_fixture.js');
require('dotenv').config();

let sampleSchemaModel = JSON.stringify(testFixture);
// console.log('this is the  sampleSchemaModel:', sampleSchemaModel)

const Conn = new Sequelize(
  process.env.NODE_DBNAME,
  null, //replace later with process.env.NODE_DBUSERNAME,
  null //replace later with process.env.NODE_DBPASSWORD
  , {
    dialect: 'postgres', //always postgres
    host: process.env.NODE_DBHOST
  }
);

console.log('db conn', process.env.NODE_DBNAME, process.env.NODE_DBUSERNAME, process.env.NODE_DBPASSWORD,
  process.env.NODE_DBHOST);

const DevUser = Conn.define('devUser', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  devId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dbName: {
    type: Sequelize.STRING,
  },
  dbUsername: {
    type: Sequelize.STRING
  },
  dbPassword: {
    type: Sequelize.STRING
  },
  gqlSchemaPath: {
    type: Sequelize.STRING
  },
  schemaModel: {
    type: Sequelize.TEXT
  }
});

Conn.sync({ force: true })
  .then(() => {
    DevUser.create({
      devId: 'a1b2c3',
      username: 'stevedesk',
      password: '12345',
      dbName: 'test1',
      dbUsername: '',
      dbPassword: '',
      gqlSchemaPath: 'a1b2c3_schema.js',
      schemaModel: 'this: {that: other}'
    })
    DevUser.create({
      devId: 'z1y2x3',
      username: 'jayceman',
      password: 'password',
      dbName: 'test2',
      dbUsername: '',
      dbPassword: '',
      gqlSchemaPath: 'a1b2c3_schema.js',
      schemaModel: '{[()]}'
    })
    DevUser.create({
      devId: 'aabbcc',
      username: 'derrick',
      password: 'a1b2c3',
      dbName: 'test3',
      dbUsername: '',
      dbPassword: '',
      gqlSchemaPath: 'a1b2c3_schema.js',
      schemaModel: '[{}]'
    })
  })

export default Conn;