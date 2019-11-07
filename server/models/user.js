'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({


    username : { type : String },

    password : String,

    email : { type : String, unique : true },

    phone : { type : Number },    
    
    role :  { type : Number },

    user_id :  { type : Number },

    device_id: { type : Number },
    
    device_type:{ type : String }

    });

userSchema.methods.generateHash = function (password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {

  return bcrypt.compareSync(password, this.password);
};



// // Schema  for agencies registration test
// const userSchemaForAgencyRegistration = new mongoose.Schema({
//   role: { type : Number },
//   user_id: { type : Number },
//   email: { type : String ,unique : true },
//   contact_no:{ type : Number },
//   password: String,   
//   agency_name: { type : String }, 
//   llc_or_registration_no: { type : String ,unique : true }, 
//   address: { type : String } , 
//   city: { type : String }, 
//   country: { type : String }, 
//   postal_code: { type : Number }, 
//   status:{ type : Number },
//   device_id: { type : Number },
//   device_type:{ type : String }
// });

//   userSchemaForAgencyRegistration.methods.generateHash = function (password) {

// return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchemaForAgencyRegistration.methods.validPassword = function (password) {

// return bcrypt.compareSync(password, this.password);
// };

// ///end registratation test

module.exports = mongoose.model('Users', userSchema);