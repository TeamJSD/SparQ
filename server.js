const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
// const authCtrl = require('./server/controllers/authController.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const setSchema = require('./server/middleware/setSchema');
const devUserCtrl = require('./server/middleware/devUserController');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

import { apolloExpress } from 'apollo-server';
import GQLSchemaCompiler from './compiler/gqlschema_compiler.js';
import DBCompiler from './compiler/db_compiler.js';

import devUserSchema from './server/db/sparq_schema.js'
import gqlTestSchema from './compiler/a1b2c3_schema.js';



const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/'));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.get('/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/main.css'));
})

app.post('/signup', devUserCtrl.createDevUser, (req, res) => {
  res.end();
})


app.post('/login', devUserCtrl.authenticateDevUser , (req, res) => {
  // console.log(res.cookie);
  res.end();
})

// app.get('/authorize', authCtrl.authGitUser, authCtrl.setCookie, (req, res) => {
//   res.redirect('http://localhost:3000/#/profile');
// })

app.use('/devUser', graphqlHTTP({
  schema: devUserSchema,
  graphiql: true
}))

app.post('/edit', (req, res) => {
  // console.log("this is the dev id", req.params.devId);
  //check cookies to see which user's schema to update
  //should call db_compiler
  //should call gqlschema_compilter

  res.end();
})


//works
app.use('/graphql/a1b2c3', graphqlHTTP({
  schema: gqlTestSchema,
  graphiql: true
}))


// app.get('/graphql/:devId', setSchema, apolloExpress( req => ({
//   schema: req.devSchema
// }))

app.post('/graphql/:devId', setSchema, apolloExpress(function (req) {
  // console.log("req.devSchema", req.devSchema)
  //some weird export thing... because we're not using import'
  return {schema: req.devSchema.default}
}))

// app.post('/graphql/:devid', (req, res) => {
//   console.log("req.params.devid", req.params.devid);
  
//   //first check params, then check request body
//   //this post only works for a body
//   //should find a way to use express-graphql or apollo-server
//   //this is bad practice... find a better way to do this.
//   let  devGqlSchema = require(`./compiler/${req.params.devid}_schema.js`);
//   console.log("req.body", req.body.query);
//   const reqQuery = req.body.query;
//   graphql(gqlTestSchema, reqQuery)
//     .then(result => {
//       console.log(result);
//       res.json(result);
//     })
// })

app.post('/createdb', (req, res) => {
  // const devDb = req.body;
  // console.log("this is the req body", devDb);
  // dbController.createDevUserDb(devDb.dbname)
  res.end();
})


app.listen(3000, () => console.log('started server at 3000'));


