let express = require('express');
let router = express.Router();
let triageController  = require('../controllers/triage/triageController');
let messageTriageController = require('../controllers/triage/messageTriageController');
/* GET users listing. */

//buscar
router.get('/search/:id', function(req, res, next) {
  triageController.getTriageByPatientId(req,res);
});
router.get('/message/:id',function(req,res,next){
  
  messageTriageController.getMessagesByTriage(req.params.id,res);
});
router.get('/', function(req, res, next) {
  triageController.getAll(res);
});

router.post("/message",function(req,res,next){
  messageTriageController.sendMessageTriage(req,res);
});

//crear
router.post('/', function(req, res, next) {
triageController.addTriage(req,res);
//  res.send('respond with a resource');
});
//actualizar
router.put('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
