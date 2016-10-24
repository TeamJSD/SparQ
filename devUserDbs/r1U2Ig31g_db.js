import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'r1U2Ig31g', //name of users individual db.
  null, // username
  null, { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

const Person = Conn.define('person', {
Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
Age: {
      type: Sequelize.INTEGER,
      allowNull: false
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

const Test = Conn.define('test', {
test: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const test2 = Conn.define('test2', {
name: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const Test3 = Conn.define('test3', {
test: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

Person.hasMany(Post);
Post.hasOne(Person);
test2.hasOne(Person);
Test3.hasOne(Post);

Conn.sync()
export default Conn;