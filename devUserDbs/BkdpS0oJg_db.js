import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'BkdpS0oJg', //name of users individual db.
  null, // username
  null, { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

const Derrick = Conn.define('derrick', {
name: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const Tst = Conn.define('tst', {
test: {
      type: Sequelize.STRING,
      allowNull: false
    },
});


export default Conn;