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
router.post('/', function(req, res, next) {
	
  patientController.createPatient(req,res);
});
router.patch('/:id',function(req,res,next){
	patientController.updatePatientService(req,res);
});
router.patch('/medic/:id/:idMedic',function(req,res,next){
	patientController.updateIdMedic(req,res);
});
router.get('/medic/:id',function(req,res,next){
	patientController.getPatientesByMedic(req,res);
})


module.exports = router;
