const setSchema = function (req, res, next) {
  console.log("re .q.params.devId", req.params);
  let devSchema = require(`../../compiler/${req.params.devId}_schema.js`)
  req.devSchema = devSchema
  next();
}

module.exports =  setSchema;
