'use strict';

const mongoose = require('mongoose');
//const User = require('../models/user');
//var Schema = mongoose.Schema;

const Vehicleschema = new mongoose.Schema({
    vehicle_id:{type : String},
    company_name: { type : String }, 
    dimension: { type : Number }, 
    discription: { type : String }, 
    gross_weight: { type : Number } , 
    model: { type : String }, 
    payload: { type : Number }, 
    tyre:{ type : Number },
  

});

module.exports = mongoose.model('vehicles', Vehicleschema);
