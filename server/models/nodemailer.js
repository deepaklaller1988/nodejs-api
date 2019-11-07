'use strict';

const mongoose = require('mongoose');
//const User = require('../models/user');
// var Schema = mongoose.Schema;

const mailschema = new mongoose.Schema({
    from: { type : String }, 
    to: { type : String }, 
    subject: { type : String },
   text:{type : String}
  //  user:{ type: Schema.Types.ObjectId, ref: 'Users' }

});

module.exports = mongoose.model('mails', mailschema);
