const express = require('express');
const bodyParser = require('body-parser');
// const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
const authCtrl = require('./server/controllers/authController.js');
let userSchema;
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userCtrl = require('./server/controllers/userController');

import GQLSchemaCompiler from './compiler/gqlschema_compiler.js';
import DBCompiler from './compiler/db_compiler.js';

console.log(GQLSchemaCompiler());
console.log(DBCompiler());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log("got /")
  res.end();
})

app.post('/signup', (req, res) => {
  console.log('hit sign up')
  res.end();
})

// app.get('/authorize', authCtrl.authUser, authCtrl.setCookie, (req, res) => {
//   res.redirect('http://localhost:8100/#/profile');
// })

app.post('/data', (req, res) => {
  console.log(req.body)
  res.end();
})

app.get('/graphql/:id', (req, res) => {
  console.log("posted to graphql/:id");
  console.log(`res.params.id: ${req.params.id}`);
  userSchema = require(`./schemas/${req.params.id}`);

  graphql(userSchema.schema, '{hello}', userSchema.root)
    .then((response) => {
      console.log(response);
    })
    .then(() => {
      res.end()
    })
})

app.listen(3000, () => console.log('started server at 3000'));