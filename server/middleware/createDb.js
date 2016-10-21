const exec = require('child_process').exec;



const createDevUserDb = function(name) {
  console.log("name inside createDB.js", name)
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

module.exports = createDevUserDb;


