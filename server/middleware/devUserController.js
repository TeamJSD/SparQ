import sparqDb from './../db/sparqDb';
import createDBFile from './../../transpiler/db_transpiler';
import createGqlSchemaFile from './../../transpiler/gqlschema_transpiler';
const createDevUserDb = require('./createDb');
const shortid = require('shortid');

//check to see if user already exists... uniqueness
//sessions?
//create id

const devUserController = {};

//create devUser in sparDB
devUserController.createDevUser = function(req, res, next) {
  console.log("this is the req body in createdevuser", req.body)
  const devId = shortid.generate();
  console.log("this is the devid generated.  it should match below: ", devId)
  sparqDb.models.devUser.create({
      username: req.body.username,
      password: req.body.password,
      devId: devId
    })
    .then(data => {
      console.log("user created ");
    })
    .catch(err => {
      console.log("error!", err)
    })
  req.devId = devId;
  res.cookie('devId', devId);
  next();
}

devUserController.createDevUserDb = function(req, res, next) {
  console.log("this is the devId inside createdb.  the db created should match this:", req.devId)
  createDevUserDb(req.devId);
  next();
}

//basic login authentication
devUserController.authenticateDevUser = function(req, res, next) {
  const submittedPassword = req.body.password;
  const submittedUsername = req.body.username;
  sparqDb.models.devUser.findOne({ where: { username: submittedUsername } })
    .then((user) => {
      if (user.password !== submittedPassword) {
        console.log("password was in correct... redirecting")
      } else {
        console.log("authentication successful");
        res.cookie('devId', user.devId)
        next();
      }
    })
    .catch((err) => {
      console.log("there was an error.  Either the user does not exist or some other error")
    })
}

//writes userSchema tables to the DB. 
devUserController.setDevUserSchema = function(req, res, next) {
  console.log("this is the req.body", req.body)
  const devId = req.cookies.devId;
  const newScaffold = JSON.stringify(req.body);
  sparqDb.models.devUser.findOne({ where: { devId: devId } })
    .then((user) => {
      user.updateAttributes({
        schemaModel: newScaffold
      })
      next();
    })
    .catch((err) => {
      console.log("there was an error.  maybe the user doesnt exist")
    })
}

// devUserController.constructScaffold = function(req, res, next) {
//   //create fixture object
//   const scaffold = {};
//   scaffold.userID = req.cookies.devId;
//   scaffold.UserPassword = '';
//   //change this
//   scaffold.DBName = 'edittest';
//   scaffold.tables = req.body.tables;
//   req.body.scaffold = scaffold;
//   next();
// }

//creates db file using transpiler from scaffold which was attached to req.body. 
devUserController.buildSequelizeSchema = function(req, res, next) {
  console.log("this is the req.body", req.body)
  const scaffold = req.body;
  createDBFile(scaffold);
  next();
}

//creates gql file using transpiler from scaffold which was attached to req.body. 
devUserController.buildGqlSchema = function(req, res, next) {
  console.log("inside buildGqlSchema");
  const scaffold = req.body;
  createGqlSchemaFile(scaffold);
  next();
}

//contstructs scaffold and attaches to req.body.


//queries db for existing userSchema.
devUserController.getUserSchema = function(req, res, next) {
  const devId = req.params.devId;
  console.log("this is the devId", devId);
  sparqDb.models.devUser.findOne({ where: { devId: devId } })
    .then(user => {
      console.log("got this schema", user.schemaModel)
        //may have to JSON.parse?
      req.body.schemaModel = user.schemaModel
      next();
    })

}

module.exports = devUserController;