import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'edittest', //name of users individual db.
  'z1y2x3', // username
  '', { //password
    dialect: 'postgres', //always postgres
    host: 'localhost' //instance
  }
);

const Book = Conn.define('book', {
title: {
      type: Sequelize.STRING,
      allowNull: false
    },
author: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const Booklet = Conn.define('booklet', {
title: {
      type: Sequelize.STRING,
      allowNull: false
    },
subtitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
});


export default Conn;