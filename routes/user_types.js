var express = require('express');
var user_typeController=require('../controllers/user/userTypeController');
var router = express.Router();

router.get('/',function(req,res,next){
  user_typeController.getAllTypes(req,res);
});
router.get('/:id',function(req,res,next){
	console.log(req.params);
	user_typeController.findTypeId(req,res);
});
router.post('/:id',function(req,res,next)
	{
		user_typeController.AddPermissions(req,res);
	});
router.delete('/:id',function(req,res,next)
	{
		user_typeController.DeletePermission(req,res);
	});
module.exports = router;
