///////// should these go in the server.js? 
const Sequelize = require('sequelize');
const _ =  require('lodash');
const faker = require('faker');
let fix = {
  "userID": 123,
  "modelName": "Person",
  "fields": [{
    "fieldName": "email",
    "type": "string",
    "required": true,
    "mutable": false
  }, {
    "fieldName": "firstName",
    "type": "string",
    "required": true,
    "mutable": false
  }, {
    "fieldName": "age",
    "type": "number",
    "required": false,
    "mutable": true
  }]
}

//convert type to sequelize type

const Conn = new Sequelize(
  'test',
  null,
  null, //name of users individual db.
  { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

////define schema. 
const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
});

// const Post = Conn.define('post', {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   content: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
// });

//Relationships
// Person.hasMany(Post);
// Post.belongsTo(Person);

////
Conn.sync({ force: true }).then(() => {
  // _.times(10, () => {
  //   return Person.create({
  //     firstName: Faker.name.firstName(),
  //     lastName: Faker.name.lastName(),
  //     email: Faker.internet.email()
  //   })
  // })
  Person.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
  })
});

module.exports = Conn;