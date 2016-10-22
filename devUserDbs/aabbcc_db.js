import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'aabbcc', //name of users individual db.
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

const Steve = Conn.define('steve', {
Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

Derrick.hasMany(Derrick);
Steve.belongsTo(Derrick);

export default Conn;