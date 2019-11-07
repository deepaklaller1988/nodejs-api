'use strict';

const mongoose = require('mongoose');
//const User = require('../models/user');
var Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    user_id: { type : Number }, 
    agency_name: { type : String }, 
    llc_or_registration_no: { type : String }, 
    address: { type : String } , 
    city: { type : String }, 
    country: { type : String }, 
    postal_code: { type : Number }, 
    status:{ type : Number },
   user:{ type: Schema.Types.ObjectId, ref: 'Users' }

});

module.exports = mongoose.model('agencies', schema);
