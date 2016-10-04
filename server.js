const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log("got /")
  res.end();
})

app.listen(3000);