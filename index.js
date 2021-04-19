const express = require('express'); // load up the express framework and body-parser helper
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs'); // I'll load up node's built in file system helper library here

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
const routes = require('./routes/products.js')(app, fs);

const index = app.listen(5001, () => {
  console.log('Listening on port %s...', index.address().port);
});
