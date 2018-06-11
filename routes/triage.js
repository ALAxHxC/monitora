var express = require('express');
var router = express.Router();
var triageController  = require('../controllers/triage/triageController');
/* GET users listing. */
router.get('/', function(req, res, next) {
//	traigeController.addTriage(req,res);
 // res.send('respond with a resource');
});
//crear
router.post('/', function(req, res, next) {
triageController.addTriage(req,res);
//  res.send('respond with a resource');
});
router.post('/notification',function(req,res,next){
	triageController.addNotification(req,res);
});
//actualizar
router.put('/', function(req, res, next) {
  res.send('respond with a resource');
});
//buscar
router.get('/:id', function(req, res, next) {
  triageController.getTriageByPatientId(req,res);
});
module.exports = router;
