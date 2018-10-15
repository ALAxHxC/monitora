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
router.get('/search/:id',function(req,res,next){
  medicController.getMedicById(req.params.id,res);
});
router.post('/', function(req, res, next) {
  userController.createUserMedic(req,res);
});
router.patch('/:id',function(req,res,next){
  medicController.updateMedicService(req,res)
})
module.exports = router;
