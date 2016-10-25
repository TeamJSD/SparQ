import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'Hy5-2AiJx', //name of users individual db.
  null, // username
  null, { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

const Users = Conn.define('users', {
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

Users.Posts(hasMany);
Posts.Users(belongsTo);

Conn.sync()
export default Conn;