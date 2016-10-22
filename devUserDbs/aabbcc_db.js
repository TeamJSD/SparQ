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
Email: {
      type: Sequelize.STRING,
      allowNull: false
    },
Age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
});

const Steve = Conn.define('steve', {
Dicksize: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
});

Derrick.belongsTo(Steve);
Steve.hasMany(Derrick);

export default Conn;