import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

require('dotenv').config();

const Conn = new Sequelize(
  'sparqdb', //name of users individual db.
  process.env.NODE_DBUSERNAME, // username
  process.env.NODE_DBPASSWORD, { //password
    dialect: 'postgres', //always postgres
    host: process.env.NODE_DBHOST //instance
  }
);

// console.log(process.env.NODE_DBUSERNAME, process.env.NODE_DBPASSWORD, process.env.NODE_DBHOST);

const Person = Conn.define('person', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({ force: true }).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `sample title by ${person.firstName}`,
        content: 'this is a sample article'
      })
    })
  })
})

export default Conn;