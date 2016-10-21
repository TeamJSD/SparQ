import sparqDb from './../db/sparqDb';
import createDBFile from './../../transpiler/db_transpiler';
import createGqlSchemaFile from './../../transpiler/gqlschema_transpiler';
const shortid = require('shortid');

//check to see if user already exists... uniqueness
//sessions?
//create id

const devUserController = {};

//create devUser in sparDB
devUserController.createDevUser = function(req, res, next) {
  const devId = shortid.generate();
  sparqDb.models.devUser.create({
      username: req.body.username,
      password: req.body.password,
      devId: devId
    })
    .then(data => {
      console.log("this is what create returns: ", data);
    })
    .catch(err => {
      console.log("error!", err)
    })
  req.devId = devId;
  res.coodie('devId', devId);
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
      }
    })
    .catch((err) => {
      console.log("there was an error.  Either the user does not exist or some other error");
    })
}

//writes userSchema tables to the DB. 
devUserController.setDevUserSchema = function(req, res, next) {
  const devId = req.cookies.devId;
  const newSchemaModel = JSON.stringify(req.body.tables);
  sparqDb.models.devUser.findOne({ where: { devId: devId } })
    .then((user) => {
      user.updateAttributes({
        schemaModel: newSchemaModel
      })
      next();
    })
    .catch((err) => {
      console.log("there was an error.  maybe the user doesnt exist")
    })
}

//creates db file using transpiler from scaffold which was attached to req.body. 
devUserController.buildSequelizeSchema = function(req, res, next) {
  console.log("this is the req.body.scaffold", req.body.scaffold)
  const scaffold = req.body.scaffold;
  createDBFile(scaffold);
  next();
}

//creates gql file using transpiler from scaffold which was attached to req.body. 
devUserController.buildGqlSchema = function(req, res, next) {
  console.log("inside buildGqlSchema");
  const scaffold = req.body.scaffold;
  createGqlSchemaFile(scaffold);
  next();
}

//contstructs scaffold and attaches to req.body.
devUserController.constructScaffold = function(req, res, next) {
  //create fixture object
  const scaffold = {};
  scaffold.userID = req.cookies.devId;
  scaffold.UserPassword = '';
  //change this
  scaffold.DBName = 'edittest';
  scaffold.tables = req.body.tables;
  req.body.scaffold = scaffold;
  next();
}

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