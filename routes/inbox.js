let express = require('express');
let router = express.Router();
let inboxController = require('../controllers/messages/inboxMessagesController');

/* GET users listing. */
router.get('/search/:id',function(req,res,next){
    inboxController.getInboxById(req.params.id,res);
})
router.get('/medic/:id', function(req, res, next) {
    inboxController.getByMedic(req.params.id,res);
});

router.get('/patient/:id', function(req, res, next) {
    inboxController.getByPatient(req.params.id,res);
});
router.post('/:id', function(req, res, next) {
    inboxController.addMessage(req.params.id,req.body,res);
});
router.post('/', function(req, res, next) {
    inboxController.createMessage(req,res);
});

module.exports = router;