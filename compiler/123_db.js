import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'DBNAME123ABC', //name of users individual db.
  '123', // username
  'ABC', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

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
Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
Content: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

Person.hasMany(Post);
Post.belongsTo(Person);
module.exports = Conn;