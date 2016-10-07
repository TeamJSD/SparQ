///////// should these go in the server.js? 
import Sequelize from 'sequelize';
import _ from 'lodash';

///// does this need to go in each file because we only have a single db instance? 
const Conn = new Sequelize(
  'relay', //name of users individual db.
  'postgres', // username
  'postgres', { //password
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

//Relationships
Person.hasMany(Post);
Post.belongsTo(Person);

////nothing
Conn.sync({ force: true }).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then((person) => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: 'this is a sample article'
      });
    });
  })
});

export default Conn;