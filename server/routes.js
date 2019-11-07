const express = require('express');
var auth = require('./controllers/auth');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//login signup and fatch
router.get('/auth/allvehicles', (req, res) => { auth.allvehicles(req, res) });
router.get('/auth/allAgencies', (req, res) => { auth.allAgencies(req, res) });
router.get('/auth/users', (req, res) => { auth.allUsers(req, res) });
router.post('/auth/login', (req, res) => { auth.login(req, res) });
router.post('/auth/signup', (req, res) => { auth.signup(req, res) });
router.post('/auth/signup_driver', (req, res) => { auth.signup_driver(req, res) });
router.post('/auth/add_vehicle', (req, res) => { auth.add_vehicle(req, res) });



// email sender
router.post('/auth/sendmail', (req, res) => { auth.sendmail(req, res) });

// romovable api routes

router.delete('/auth/deleteagency/:id', (req, res) => { auth.deleteagency(req, res) });
router.delete('/auth/deletedriver/:id', (req, res) => { auth.deletedriver(req, res) });
router.delete('/auth/deleteuser/:id', (req, res) => { auth.deleteuser(req, res) });
router.delete('/auth/deletevehicle/:id', (req, res) => { auth.deletevehicle(req, res) });


// updatable api's routes
router.put('/auth/updateUser/:id', (req, res) => { auth.updateUser(req, res) });
router.put('/auth/updateDriver/:id', (req, res) => { auth.updateDriver(req, res) });
router.put('/auth/updateAgency/:id', (req, res) => { auth.updateAgency(req, res) });
router.put('/auth/updateVehicle/:id', (req, res) => { auth.updateVehicle(req, res) });


// fatch single user / agency / driver  routes
router.get('/auth/getUser/:id', (req, res) => { auth.getUser(req, res) });
router.get('/auth/getAgency/:id', (req, res) => { auth.getAgency(req, res) });
router.get('/auth/getDriver/:id', (req, res) => { auth.getDriver(req, res) });
router.get('/auth/getVehicle/:id', (req, res) => { auth.getVehicle(req, res) });




router.get('/todo/tasks/:id', (req, res) => { todo.getTasks(req, res) });
router.post('/todo/task', (req, res) => { todo.postTask(req, res) });
router.get('/todo/task/:id', (req, res) => { todo.getTask(req, res) });
router.put('/todo/task/:id', (req, res) => { todo.updateTask(req, res) });


router.delete('/todo/task/:id', (req, res) => { todo.deleteTask(req, res) });


module.exports = router;





