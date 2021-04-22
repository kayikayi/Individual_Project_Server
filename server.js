'use strict';
const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var app = express();
app.use(cors());

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: 1000000000000 }));

app.use(fileUpload({
  safeFileNames: true,
  preserveExtension: true,
  createParentPath: `${__dirname}/uploads`
}));

// MySQL connection
app.use(function(req, res, next) {
  res.locals.mysql = require('./database/database');
  next();
});

//Init routes
app.use(require('./routes/user'));
app.use(require('./routes/modules'));
app.use(require('./routes/playlist'));
app.use(require('./routes/video'));

app.listen(3030);