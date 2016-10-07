const pg = require('pg');
const exec = require('child_process').exec;
// const commander = require('commander');

const config = {
  database: 'sparq'
}

const dbController = {};

let client = new pg.Client(config);
// client.on('drain', client.end.bind(client));


dbController.createDevUserDb = function(name) {
  client.connect(function (err) {
    if (err) throw err;
    console.log("connected to sparq db")
    execCreateDb(name);
    client.end();
  });
  function execCreateDb(name) {
    exec(`createdb ${name}`, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
    });
  }
}

module.exports = dbController;


