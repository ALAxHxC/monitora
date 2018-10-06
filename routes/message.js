var express = require('express');
const messagesCTRL=require('../controllers/messages/messagesController');
var router = express.Router();

/* GET home page. */
router.get('/view/all', function(req, res, next) {
  messagesCTRL.getAllMessages(res);
});
router.get('/view/patient/:id', function(req, res, next) {
  messagesCTRL.updatePatientView(req.params.id,res);
});
router.get('/view/medic/:id', function(req, res, next) {
  messagesCTRL.updateMedicView(req.params.id,res);
});
router.get('/medic/:id', function(req, res, next) {
  messagesCTRL.getByMedic(req.params.id,res);
});
router.get('/patient/:id', function(req, res, next) {
  console.log(req.params.id);
 messagesCTRL.getByPatient(req.params.id,res);
});
router.post('/',function(req,res,next){
  messagesCTRL.createMessage(req,res);
});

module.exports = router;
