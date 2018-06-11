var express = require('express');
var router = express.Router();
var apiController=require('../security/apiController');

/* GET users listing. */
router.post('/', function(req, res, next) {
  apiController.register(req,res);
});
router.post('/sign',function(req, res, next){
	apiController.sign(req,res);
});

router.post('/login',apiController.login,function(req, res, next){
	console.log("Termino");
	res.status(200).json({status:200});
});
module.exports = router;