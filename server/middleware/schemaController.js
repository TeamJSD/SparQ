const setSchema = function (req, res, next) {
  console.log("re.q.params.devId", req.params);
  let devSchema = require(`../../compiler/${req.params.devId}_schema.js`)
  // console.log(devSchema)
  req.devSchema = devSchema
  next();
}

module.exports =  setSchema;
