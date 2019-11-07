const express = require('express');
const Users = require('../models/user');
const Agencies = require('../models/agencies');
const Vehicles = require('../models/vehicles')
const Drivers = require('../models/drivers')
const Mail = require ('../models/nodemailer')
const valid = require('../configs/validation');
var cookie = require('cookie');
var nodemailer = require('nodemailer');
var multer  = require('multer');
var fs  = require('fs');


// /// file uplode code /////
// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//       var dir = './uploads';
//       if (!fs.existsSync(dir)){
//           fs.mkdirSync(dir);
//       }
//       callback(null, dir);
//   },
//   filename: function (req, file, callback) {
//       callback(null, file.originalname);
//   }
// });


////// api for find single user  // driver  // agency //////////////////

exports.getUser = function (req , res){
  Users.findOne( {
    'user_id': req.params.id
  }, (err, user) => {
  
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        message: 'user not found!',
        errmsg: err.errmsg
      });
    }
    else{
      return res.json({
        status: true,
        message: 'user found!',
        user : user
      });
    }
  });
}


exports.getAgency = function (req , res){
  Agencies.findOne( {
    'user_id': req.params.id
  }, (err, agency) => {
  
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        message: 'Agency not found!',
        errmsg: err.errmsg
      });
    }
    else{
      return res.json({
        status: true,
        message: ' Agency found!',
        agency : agency
      });
    }
  });
  
}

exports.getDriver = function (req , res){
  Drivers.findOne( {
    'user_id': req.params.id
  }, (err, driver) => {
  
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        message: 'driver not found!',
        errmsg: err.errmsg
      });
    }
    else{
      return res.json({
        status: true,
        message: ' driver found!',
        driver : driver
      });
    }
  });
}



exports.getVehicle = function (req , res){
  Vehicles.findOne( {
    'vehicle_id': req.params.id
  }, (err, vehicle) => {
  
    if (err) {
      console.log(err);
      return res.json({
        status: false,
        message: 'vehicle not found!',
        errmsg: err.errmsg
      });
    }
    else{
      return res.json({
        status: true,
        message: ' vehicle found!',
        vehicle : vehicle
      });
    }
  });
}




///// api's for fatching /////////  api's for fatching  /////////////// api's for fatching /////////////

exports.allUsers = function (req, res) {
  Users.find({}).sort({
      createdAt: -1
    })
    .exec((err, users) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      return res.json(users);
    });
};


exports.allDrivers = function (req, res) {
  Drivers.find({}).sort({
      createdAt: -1
    })
    .exec((err, drivers) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      return res.json(drivers);
    });
};

exports.allAgencies = function (req, res) {
  Agencies.find({}).sort({
      createdAt: -1
    })
    .exec((err, agencies) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      return res.json(agencies);
    });
};

exports.allDrivers = function (req, res) {
  Drivers.find({}).sort({
      createdAt: -1
    })
    .exec((err, drivers) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      return res.json(drivers);
    });
};

exports.allvehicles = function (req, res) {
  Vehicles.find({}).sort({
      createdAt: -1
    })
    .exec((err, vehicles) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      return res.json(vehicles);
    });
};


// login Api for loging all users in own side. 

exports.login = function (req, res) {
  if (!valid.email(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid Email'
    });
  }
  if (!valid.emailLength(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid Email Length'
    });
  }
  if (!valid.passwordLength(req.body.password)) {
    return res.json({
      status: false,
      message: 'Invalid Password Length'
    });
  } else {
    Users.findOne({
      'email': req.body.email
    }, (err, user) => {
      if (err) {
        return res.json({
          status: false,
          message: err
        });
      }
      if (!user) {
        return res.json({
          status: false,
          message: 'Wrong email address or Password!'
        });
      }
      if (!user.validPassword(req.body.password)) {
        return res.json({
          status: false,
          message: 'Wrong email address or Password!'
        });
      }
      user.password = undefined;
      return res.json({
        status: true,
        message: 'User successfully logged in.',
        user: user
      });
    })
  }
};

exports.signup = function (req, res) {
 
  if (!valid.email(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid Email'
    });
  }
  // if (!valid.usernameLength(req.body.username)) {
  //   return res.json({
  //     status: false,
  //     message: 'Invalid Username Length'
  //   });
  //}
  if (!valid.emailLength(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid email Length'
    });
  }
  if (!valid.passwordLength(req.body.password)) {
    return res.json({
      status: false,
      message: 'Invalid password Length'
    });
  } else {
    var user = new Users({
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      user_id: req.body.user_id,
      device_id: req.body.device_id,
      device_type:  req.body.device_type
    });

    var agencies = new Agencies({
      user_id: req.body.user_id,
      agency_name: req.body. agency_name,
      llc_or_registration_no: req.body.llc_or_registration_no, 
      address: req.body.address, 
      city: req.body.city, 
      country: req.body.country, 
      postal_code: req.body.postal_code, 
      status:req.body.status,
      
    });

    
    user.password = user.generateHash(user.password);
    user.save((err) => {
     
      if (err) {
     
        return res.json({
          status: false,
          message: err
        });
      }else{
      
          agencies.save();
       
          return res.json({
          status: true,
          message: 'User registered successfully!'
        });

      }  

    });
    

  }
};


// Api for driver registration by admin panal and agency panal both are use this api to register drivers.

exports.signup_driver = function (req, res) {
 
  if (!valid.email(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid Email'
    });
  }

  if (!valid.emailLength(req.body.email)) {
    return res.json({
      status: false,
      message: 'Invalid email Length'
    });
  }
  if (!valid.passwordLength(req.body.password)) {
    return res.json({
      status: false,
      message: 'Invalid password Length'
    });
  } else {

    var user = new Users({
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      user_id: req.body.user_id,
      device_id: req.body.device_id,
      device_type:  req.body.device_type
    });



    var drivers = new Drivers({
      user_id: req.body.user_id,
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      driver_image : req.body.driver_image,
      social_sec_number: req.body.social_sec_number, 
      address: req.body.address, 
      city: req.body.city, 
      country: req.body.country, 
      postal_code: req.body.postal_code, 
      status:req.body.status,
      emergency_contact : 
       {comp_name : req.body.emergency_contact.comp_name,
        anumber : req.body.emergency_contact.anumber,
        pnumber : req.body.emergency_contact.pnumber,
        releted_address : req.body.emergency_contact.releted_address,
        relation :req.body.emergency_contact.relation
      
      },
      documents :{ lic_img : req.body.documents.lic_img,
        lic_img : req.body.documents.doc_img   
}
 
      
    });
    console.log(drivers.driver_image);

    user.password = user.generateHash(user.password);
    user.save((err) => {
     
      if (err) {
     
        return res.json({
          status: false,
          message: err
        });
      }else{
      var base64Data = drivers.driver_image.replace(/^data:image\/png;base64,/, "");
      require("fs").writeFile("", base64Data, 'base64', function(err) {
        console.log(err);
      });
          drivers.save();
          return res.json({
          status: true,
          message: 'User registered successfully!'
        });

      }
    });
  }
};

exports.sendmail = function (req, res) {
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'puneet.prajapati@contriverz.com',
      pass: '@Contrive27#'
    }
  });
  var mailOptions = {
      from: req.body.emailform,
      to: req.body.emailTo,
      subject: req.body.subject,
      text: req.body.text
  };
  console.log(mailOptions)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("=>>>>if")
      console.log(error);
    } else {
      // mailOptions.save();
      console.log("=>>>>else")
      console.log('Email sent: ' + info.response);
      return res.json({
        status: true,
        message: 'Email sent succesfully',
        
      });
     
    }

  });
}




// exports.agency_register = function (req, res) {
//   if (!valid.email(req.body.email)) {
//     return res.json({
//       status: false,
//       message: 'Invalid Email'
//     });
//   }
 
//   if (!valid.emailLength(req.body.email)) {
//     return res.json({
//       status: false,
//       message: 'Invalid email Length'
//     });
//   }
//   if (!valid.passwordLength(req.body.password)) {
//     return res.json({
//       status: false,
//       message: 'Invalid password Length'
//     });
//   } else {
//     var user = new User({
//       agency_name :req.body.agency_name,
//       password: req.body.password,
//       contact_no: req.body.contact_no,
//       email: req.body.email,
//       role: req.body.role,
//       user_id: req.body.user_id,
//       llc_or_registration_no:req.body.llc_or_registration_no,
//       address:req.body.address,
//       city:req.body.city,
//       country:req.body.country,
//       postal_code:req.bodypostal_code,
//       status:req.body.status,
//       device_id:req.body.device_id,
//       device_type:req.body.device_type,
//     });
//     user.password = user.generateHash(user.password);
//     user.save((err) => {
//       if (err) {
//         return res.json({
//           status: false,
//           message: err
//         });
//       }
//       return res.json({
//         status: true,
//         message: 'Agency registered successfully!'
//       });
//     });
//   }
// };



// exports.updateUser = function (req, res) {
//   Users.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//     if (err) {
//       console.log(err)
//       return res.json({
//         status: false,
//         message: 'Oops! something went wrong, Please try again later.',
//         errmsg: err.errmsg
//       });
//     }
//     Users.findOne({
//       '_id': user._id
//     }, (err, newUserData) => {
//       if (err) {
//         return res.json({
//           status: false,
//           message: 'User not found!',
//           errmsg: err.errmsg
//         });
//       }
//       if (newUserData) {
//         newUserData.password = undefined;
//         return res.json({
//           status: true,
//           message: 'User Updated',
//           user: newUserData
//         });
//       }
//     });
//   });
// };




// delete apis start ////////////////////////////////////////////////////////

// exports.deleteuser = (req, res) => {
//   Users.findByIdAndRemove(req.params.user_id)
//   .then(user => {
//       if(!user) {
//           return res.status(404).send({
//               message: "agency not found with id " + req.params.user_id
//           });
//       }
//       res.send({message: "Note deleted successfully!"});
//   }).catch(err => {
//       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//           return res.status(404).send({
//               message: "Note not found with id " + req.params.user_id
//           });                
//       }
//       return res.status(500).send({
//           message: "Could not delete user with id " + req.params.user_id
//       });
//   });
// };



exports.deleteuser = (req, res) => {
  userid =parseInt(req.params.id)
  console.log(userid);
  Users.findOneAndDelete({user_id : userid})
 // console.log('====>',req.params.user_id)
  .then(user => {
      if(!user  ) {
          return res.status(404).send({
              message: "user not found with id " + userid
          });
      }
      res.send({message: "user deleted successfully!"});
  
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "user not found with id " + userid
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + userid
      });
  });
};



exports.deleteagency = (req, res) => {
  userid =parseInt(req.params.id)
  console.log(userid);
  Agencies.findOneAndDelete({user_id : userid})
  
 // console.log('====>',req.params.user_id)
  .then(agencies => {
      if(!agencies  ) {
          return res.status(404).send({
              message: "agency not found with id " + userid
          });
      }
      res.send({message: "agency deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "agency not found with id " + userid
          });                
      }
      return res.status(500).send({
          message: "Could not delete agency with id " + userid
      });
  });
};


exports.deletedriver = (req, res) => {
  userid =parseInt(req.params.id)
  console.log(userid);
  Drivers.findOneAndDelete({user_id : userid})
 // console.log('====>',req.params.user_id)
  .then(drivers => {
      if(!drivers  ) {
          return res.status(404).send({
              message: "driver not found with id " + userid
          });
      }
      res.send({message: "driver deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "driver not found with id " + userid
          });                
      }
      return res.status(500).send({
          message: "Could not delete driver with id " + userid
      });
  });
};

exports.deletevehicle = (req, res) => {
  vehicleid =parseInt(req.params.id)
  console.log(vehicleid);
  Vehicles.findOneAndDelete({vehicle_id : vehicleid})
 // console.log('====>',req.params.user_id)
  .then(vehicles => {
      if(!vehicles  ) {
          return res.status(404).send({
              message: "Vehicle not found with id " + vehicleid
          });
      }
      res.send({message: "Vehicle deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Vehicle not found with id " + vehicleid
          });                
      }
      return res.status(500).send({
          message: "Could not delete Vehicle with id " + vehicleid
      });
  });
};

// api's for updation /////////// api's for updation ///////////// api's for updation / api's for updation 

// exports.updateUser = function (req, res) {
//   Users.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//     if (err) {
//       console.log(err)
//       return res.json({
//         status: false,
//         message: 'Oops! something went wrong, Please try again later.',
//         errmsg: err.errmsg
//       });
//     }

//     Users.findOne({
//       '_id': user._id
//     }, (err, newUserData) => {
//       if (err) {
//         return res.json({
//           status: false,
//           message: 'User not found!',
//           errmsg: err.errmsg
//         });
//       }
//       if (newUserData) {
//         newUserData.password = undefined;
//         return res.json({
//           status: true,
//           message: 'User Updated',
//           user: newUserData
//         });
//       }
//     });
//   });
// };


exports.updateUser = function (req, res) {
 
  Users.findOne( {
    'user_id': req.params.id
  }, (err, user) => {
   // console.log(user)
    if (err) {
      //console.log(err)
      return res.json({
        status: false,
        message: 'Oops! something went wrong, Please try again later.',
        errmsg: err.errmsg
      });
    }

Users.findByIdAndUpdate(user._id, req.body , (err, newUserData) =>{
  console.log(user.user_id);
  console.log( req.body);

  if (err) {
    console.log(err);
    return res.json({
      status: false,
      message: 'User not found!',
      errmsg: err.errmsg
    });
  }
  if (newUserData) {
    newUserData.password = undefined;
    return res.json({
      status: true,
      message: 'User Updated',
      user: newUserData
    });
  }

})

  });
};


exports.updateDriver = function (req, res) {
  Drivers.findOne( {
    'user_id': req.params.id
  }, (err, driver) => {
   // console.log(user)
    if (err) {
      //console.log(err)
      return res.json({
        status: false,
        message: 'Oops! something went wrong, Please try again later.',
        errmsg: err.errmsg
      });
    }

    Drivers.findByIdAndUpdate(driver._id, req.body , (err, newDriverData) =>{
  console.log(driver.user_id);
  console.log( req.body);

  if (err) {
    console.log(err);
    return res.json({
      status: false,
      message: 'Driver not found!',
      errmsg: err.errmsg
    });
  }
  if (newDriverData) {
    return res.json({
      status: true,
      message: 'Driver Updated',
      driver: newDriverData
    });
  }

})

  });
};



exports.updateAgency = function (req, res) {
  Agencies.findOne( {
    'user_id': req.params.id
  }, (err, agency) => {
   // console.log(user)
    if (err) {
      //console.log(err)
      return res.json({
        status: false,
        message: 'Oops! something went wrong, Please try again later.',
        errmsg: err.errmsg
      });
    }

    Agencies.findByIdAndUpdate(agency._id, req.body , (err, newAgencyData) =>{
  console.log(agency.user_id);
  console.log( req.body);

  if (err) {
    console.log(err);
    return res.json({
      status: false,
      message: 'Agency not found!',
      errmsg: err.errmsg
    });
  }
  if (newAgencyData) {
    return res.json({
      status: true,
      message: 'Agency Updated',
      agency: newAgencyData
    });
  }

})

  });
};





exports.updateVehicle = function (req, res) {
  Vehicles.findOne( {
    'vehicle_id': req.params.id
  }, (err, vehicle) => {
   // console.log(user)
    if (err) {
      //console.log(err)
      return res.json({
        status: false,
        message: 'Oops! something went wrong, Please try again later.',
        errmsg: err.errmsg
      });
    }

   Vehicles.findByIdAndUpdate(vehicle._id, req.body , (err, newVehicleData) =>{
  console.log(vehicle.vehicle_id);
  console.log( req.body);

  if (err) {
    console.log(err);
    return res.json({
      status: false,
      message: 'vehicle not found!',
      errmsg: err.errmsg
    });
  }
  if (newVehicleData) {
    return res.json({
      status: true,
      message: 'vehicle Updated',
      agency: newVehicleData
    });
  }

})

  });
};



///// vehicles Entry///////////////// vehicles Entry///////////////// vehicles Entry////////////



exports.add_vehicle = function (req, res) {

    var vehicle = new Vehicles({
      vehicle_id:req.body.vehicle_id,
      company_name: req.body.company_name,
      dimension: req.body.dimension,
      discription: req.body.discription,
      gross_weight: req.body.gross_weight,
      model: req.body.model,
      payload: req.body.payload,
      tyre: req.body.tyre
      
    });

    vehicle.save((err) => {
     
      if (err) {
     
        return res.json({
          status: false,
          message: err
        });
      }else{       
          return res.json({
          status: true,
          message: 'Vehicle Added successfully!'
        });

      }  

    });
    

  };


//////

