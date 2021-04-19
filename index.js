const express = require('express'); // load up the express framework and body-parser helper
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs'); // I'll load up node's built in file system helper library here

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
if (req.method === "OPTIONS") {
return res.sendStatus(204);
}
next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
const routes = require('./routes/products.js')(app, fs);

const PORT = process.env.PORT || 5001;

const index = app.listen(PORT, () => {
  console.log('Listening on port %s...', index.address().port);
});
