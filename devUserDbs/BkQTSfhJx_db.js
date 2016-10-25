import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'BkQTSfhJx', //name of users individual db.
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

const Posts = Conn.define('posts', {
Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
Content: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const Friends = Conn.define('friends', {
Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
ID: {
      type: Sequelize.UUID,
      allowNull: false
    },
});

Person.Posts(hasMany);
Friends.Person(belongsToMany);

Conn.sync()
export default Conn;