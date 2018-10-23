let express = require('express');
let router = express.Router();
let inboxController = require('../controllers/messages/inboxMessagesController');

/* GET users listing. */
router.post('/', function(req, res, next) {
    inboxController.createMessage(req,res);
});

module.exports = router;