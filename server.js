const express = require('express');
const bodyParser = require('body-parser');
// const graphqlHTTP = require('express-graphql');
const {graphql} = require('graphql');
let userSchema;
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
// console.log(test1);
app.get('/', (req, res) => {
  console.log("got /")
  res.end();
})

app.get('/graphql/:id', (req, res) => {
  console.log("posted to graphql/:id");
  console.log(`res.params.id: ${req.params.id}`);
  userSchema = require(`./schemas/${req.params.id}`);

  graphql(userSchema.schema, '{hello}', userSchema.root)
    .then((response) => {
      console.log(response);
    })
    .then(() => {
      res.end()
    })
})

app.listen(3000);