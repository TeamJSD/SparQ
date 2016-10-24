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

const Derrick = Conn.define('derrick', {
Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
});


export default Conn;