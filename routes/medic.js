var express = require('express');
var router = express.Router();
var userController=require('../controllers/user/userController');
let medicController = require('../controllers/user/medicController');
router.patch('/medic/:id',function(req,res){
  userController.updateMedic(req,res);
});
router.get('/',function(req,res,next){
  userController.getMedics(req,res);
});
router.post('/', function(req, res, next) {
  userController.createUserMedic(req,res);
});
router.get('patients/:id',function(req,res,next){

});

router.get('/search/:id',function(req,res,next){
  medicController.getMedicById(req.params.id,res);
});
module.exports = router;
