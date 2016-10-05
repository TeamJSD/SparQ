const pg = require('pg');
const exec = require('child_process').exec;
// const commander = require('commander');

const config = {
  database: 'postgres'
}

let client = new pg.Client(config);
// client.on('drain', client.end.bind(client));
client.connect(function (err) {
  if (err) throw err;
  console.log("we're in")
  createDB();
  client.end();
});

//show dbs
// client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', (err, result) => {
//   if (err) throw err;
//   console.log(result);
// })

//create a test db
// client.query('CREATE DATABASE test', (err, result) => {
//   if (err) throw err;
//   console.log(`result is ${result}`)
// })

//create a test db with createdb
function createDB() {
  exec('createdb test', function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
          }
  });
}
