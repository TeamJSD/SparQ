const Sequelize = require('sequelize');

const Conn = new Sequelize(
  'kcafmbns',
  'kcafmbns',
  'FayjdFpQ4eXUo8QdWbyKc9X7oCAuty4U',
  {
    dialect: 'postgres',
    host: 'tantor.db.elephantsql.com',
  }
);

const Developer = Conn.define('developer', {
  _id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.STRING
  }
});

// const Post = Conn.define('post', {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   content: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// Relations
// Person.hasMany(Post);
// Post.belongsTo(Person);

// Sync all models that aren't already in db
Conn.sync()

// Force sync all models
// Conn.sync({ force: true })

// Drop tables
// Conn.drop()
.then(() => {
  //something happens
}).catch((error) => {
  console.log(error);
});

module.exports = { Conn, Developer };