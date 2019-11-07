'use strict';

const mongoose = require('mongoose');

const Driverschema = new mongoose.Schema({
    user_id: {type :Number},
    first_name: {type : String},
    last_name:{type : String},
    driver_image :{type : String},
    social_sec_number: {type : Number}, 
    address:{type : String}, 
    city: {type : String}, 
    country:{type : String}, 
    postal_code: {type : Number}, 
    status:{type : Number},
    emergency_contact :
     {comp_name : {type : String},
      anumber :{type : Number},
      pnumber : {type : Number},
      releted_address : {type : String},
      relation:{type:String}
   
    
    },
    documents :{ lic_img : {type : String},
    doc_img :  {type : String}   
}
    
 

});

module.exports = mongoose.model('driver', Driverschema);
