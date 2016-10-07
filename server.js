const express = require('express');
const bodyParser = require('body-parser');
// const graphqlHTTP = require('express-graphql');
const {graphql} = require('graphql');
const authCtrl = require('./server/controllers/authController.js');
let userSchema;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userCtrl = require('./server/controllers/userController')
const dbController = require('./dbController/createDb');


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
  console.log("got /")
  res.end();
})

app.post('/login', userCtrl.addUser, (req, res) => {
  console.log('hit login')
  res.end();
})

app.get('/authorize', authCtrl.authUser, authCtrl.setCookie, (req, res) => {
  res.redirect('http://localhost:8100/#/profile');
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.end();
})

// app.get('/graphql/:id', (req, res) => {
//   console.log("posted to graphql/:id");
//   console.log(`res.params.id: ${req.params.id}`);
//   userSchema = require(`./schemas/${req.params.id}`);

//   graphql(userSchema.schema, '{hello}', userSchema.root)
//     .then((response) => {
//       console.log(response);
//     })
//     .then(() => {
//       res.end()
//     })
// })

app.post('/createdb', (req, res) => {
  const devDb = req.body;
  console.log("this is the req body", devDb);
  dbController.createDevUserDb(devDb.dbname)
  res.end();
})


app.listen(3000, () => console.log('started server at 3000'));

