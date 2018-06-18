const http = require('http');
const router = require('./router').router;
const express = require('express');
const app = express();
const apiController = require('./controllers/apicontroller').api;

var port = process.env.PORT || 3000 ; // setting a default of 3000

app.use('/assets', express.static(__dirname + '/public'));

// setting the view engine to ejs
app.set('view engine', 'ejs');

apiController(app);

app.listen(port);