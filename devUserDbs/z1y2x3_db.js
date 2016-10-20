import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
  'z1y2x3', //name of users individual db.
  null, // username
  null, { //password
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
Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
Content: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

Book.create({title: "test", author: "test"})

export default Conn;