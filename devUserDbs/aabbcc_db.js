import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'edittest', //name of users individual db.
  'aabbcc', // username
  '', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

const Derrick = Conn.define('derrick', {
Name: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
true: {
      type: Sequelize.false,
      allowNull: false
    },
Ethnicity: {
      type: Sequelize.STRING,
      allowNull: false
    },
false: {
      type: Sequelize.true,
      allowNull: false
    },
});


export default Conn;