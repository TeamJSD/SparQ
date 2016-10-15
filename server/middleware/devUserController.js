import sparqDb from './../db/sparqDb';
const shortid = require('shortid');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

//check to see if user already exists... uniqueness
//sessions?
//create id

const devUserController = {};



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
  next();
}

devUserController.authenticateDevUser = function(req, res, next) {
  const submittedPassword = req.body.password;
  const submittedUsername = req.body.username;
  sparqDb.models.devUser.findOne({ where: {username: submittedUsername}})
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



module.exports = devUserController;