var express = require('express');
var userController = require('../controllers/user/userController');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  userController.getUsers(req, res);
});

//post User
router.post('/', function (req, res, next) {
  userController.createUser(req, res);
  //res.send('respond with a resource');
});
router.delete('/:id', function (req, res, next) {
  userController.deleteUserByid(req.params.id, res);
});
router.patch('/password/:id', function (req, res, next) {
  userController.updatePassword(req, res);
});
router.get('/search/:id', function (req, res, next) {
  userController.getUserById(req, res);
});
router.get('/search/:id/:fb', function (req, res, next) {
  userController.updateFirebase(req, res);
});
router.get('/admin', function (req, res, next) {
  userController.getAdmins(req, res);

});
router.post('/admin', function (req, res, next) {
  userController.createUserAdmin(req, res);
  //res.send('respond with a resource');
});
router.get('/patient', function (req, res) {
  userController.getPatients(req, res);
});

router.post('/patient', function (req, res, next) {
  userController.createUserAsPatient(req, res);
  //res.send('respond with a resource');
});

router.post('/medic/:id', function (req, res) {
  userController.updateMedic(req, res);
  //res.send('respond with a resource');
});
router.get('/medic', function (req, res, next) {
  userController.getMedics(req, res);
});
router.post('/medic', function (req, res, next) {
  userController.createUserMedic(req, res);
  //res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
  userController.loginUser(req, res);
});




module.exports = router;
