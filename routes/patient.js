const express = require('express');
const patientController = require('../controllers/user/patientController');
const patientControllerDocument = require('../controllers/patient/patientController');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  patientControllerDocument.getAll(res);
});
router.get('/identification/:id', function (req, res, next) {
  patientController.searchPatientByIdentity(req, res);
});
router.get('/:id', function (req, res, next) {
  patientController.searchPatientById(req, res);
});
router.post('/', function (req, res, next) {

  patientController.createPatient(req, res);
});
router.patch('/:id', function (req, res, next) {
  patientController.updatePatientService(req, res);
});
router.patch('/medic/:id/:idMedic', function (req, res, next) {
  patientController.updateIdMedic(req, res);
});
router.get('/medic/:id', function (req, res, next) {
  patientController.getPatientesByMedic(req, res);
})
router.post('/type/:id/:type', function (req, res, next) {
  patientController.appendPatientTypes(req, res);
  //res.send('respond with a resource');
});

router.delete('/type/:id/:type', function (req, res, next) {
  patientController.deleteUserTypes(req, res);
  //res.send('respond with a resource');
});


module.exports = router;
