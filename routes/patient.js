var express = require('express');
var patientController=require('../controllers/user/patientController');
var router = express.Router();

/* GET users listing. */
router.get('/identification/:id',function(req,res,next){
  patientController.searchPatientByIdentity(req,res);
});
router.get('/:id', function(req, res, next) {
  patientController.searchPatientById(req,res);
});
//post User
router.post('/', function(req, res, next) {
	
  patientController.createPatient(req,res);
  //res.send('respond with a resource');
});
router.patch('/:id',function(req,res,next){
	patientController.updatePatientService(req,res);
});
router.patch('/medic/:id/:idMedic',function(req,res,next){
	patientController.updateIdMedic(req,res);
})


module.exports = router;
