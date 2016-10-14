import sparqDb from './../db/sparqDb';
const shortid = require('shortid');
//check to see if user already exists
//create id

const devUserController = {};



devUserController.createDevUser = function(req, res, next) {
  console.log(sparqDb);
  console.log("req.body", req.body)
  sparqDb.models.devUser.create({
    username: req.body.username,
    password: req.body.password,
    devId: shortid.generate()
  })
  next();
}

module.exports = devUserController;