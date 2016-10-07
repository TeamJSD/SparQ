const exec = require('child_process').exec;
const
const config = {
  database: 'sparq'
}

const dbController = {};


dbController.createDevUserDb = function(name) {
  function execCreateDb(name) {
    exec(`createdb ${name}`, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
    });
  }
  execCreateDb(name)
}

module.exports = dbController;


