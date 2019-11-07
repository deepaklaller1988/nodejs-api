'use strict';

// dependencies
const mongoose = require('mongoose');

// set the database name
const databaseName = 'Logitics';

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${databaseName}`);

// get notified if connection was
// successful or not
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('open', () => {
  console.log(`Connected to the ${databaseName} database`);
});
