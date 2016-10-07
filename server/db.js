const Sequelize = require('sequelize');

const Conn = new Sequelize(
  'kcafmbns',
  'kcafmbns',
  '6VOqe_dUg_bkeiYemwkeC2NMYpsFW4Rb',
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
  // email: {
  //   type: Sequelize.STRING,
  //   validate: {
  //     isEmail: true
  //   }
  // }
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