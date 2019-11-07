'use strict';

// dependencies

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
var nodemailer = require('nodemailer');

// create an instance of express
const app = express();

// configure body-parser to accept
// urlencoded bodies and json data

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//  to allow all cors origin
app.use(cors())

// connection to the database
require('./server/configs/database');

//serving index.html from dist
app.use(express.static(path.join(__dirname + '/dist')));

//serving data from public
// app.use('/server/public/images',express.static(path.join(__dirname + '/server/public/images')));

// route registration
app.use('/api', require('./server/routes'));

// Send all other requests to the Angular app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

// email sendn test code.

// set the port to use
const port = parseInt(process.env.PORT, 10) || 3000;

// start the server
const server = app.listen(port, () => {
  console.log(`App is running at: 192.168.0.113:${server.address().port}`);
});
