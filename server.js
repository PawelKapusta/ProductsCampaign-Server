// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// I'll load up node's built in file system helper library here
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/products.js')(app, fs);

const server = app.listen(5001, () => {
  console.log('listening on port %s...', server.address().port);
});