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

import GQLSchemaTranspiler from './transpiler/gqlschema_transpiler.js';
import DBTranspiler from './transpiler/db_transpiler.js';

import devUserSchema from './server/db/sparq_schema.js'
// import gqlTestSchema from './compiler/a1b2c3_schema.js';
require('dotenv').config();

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

app.post('/login', devUserCtrl.authenticateDevUser, (req, res) => {
  res.end();
})

app.get('/devUserSchema/:devId', 
  devUserCtrl.getUserSchema,
  (req, res) => {
    // let jsonSchemaModel = JSON.parse(req.body.schemaModel);
    res.send(req.body.schemaModel);
})
// app.get('/authorize', authCtrl.authGitUser, authCtrl.setCookie, (req, res) => {
//   res.redirect('http://localhost:3000/#/profile');
// })

app.use('/devUser', graphqlHTTP({
  schema: devUserSchema,
  graphiql: true
}))



app.post('/edit', 
  devUserCtrl.setDevUserSchema,
  devUserCtrl.constructScaffold,
  devUserCtrl.buildSequelizeSchema, 
  devUserCtrl.buildGqlSchema,
  (req, res) => {
  console.log("req.body.tables", req.body.tables);
  console.log("hit edit route");
  console.log("this is the cookie coming in", req.cookies.devId);
  //find proper user

  // console.log("this is the dev id", req.params.devId);
  //check cookies to see which user's schema to update
  //should call db_compiler
  //should call gqlschema_compilter

  res.end();
})

//works
// app.use('/graphql/a1b2c3', graphqlHTTP({
//   schema: gqlTestSchema,
//   graphiql: true
// }))

app.post('/graphql/:devId', 
  setSchema, 
  apolloExpress(function(req) {
  // console.log("req.devSchema", req.devSchema)
  //some weird export thing... because we're not using import'
    return { schema: req.devSchema.default }
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

//////////this block is to test invoking o the compilers////////////
// import userDefinedSchema from './fixture/postcall_fixture.js';
// console.log('invoking dbcomp', DBTranspiler(userDefinedSchema));
// console.log('invoking gqlcomp', GQLSchemaTranspiler(userDefinedSchema));

app.listen(process.env.NODE_PORT, () => console.log(`started server at ${process.env.NODE_PORT}`));