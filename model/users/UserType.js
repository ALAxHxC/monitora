var mongoose = require('mongoose');

//Schema that define the model db class UserType 
exports = module.exports = function(app, mongoose) 
{
	var apiSchema = new mongoose.Schema
	(
	  {
		  idType: {type: 'Number', index: true},
		  description : { type: 'String'},
		  name : { type: 'String'},
		  permissions: []
	  } 
	);
 mongoose.model('UserType', apiSchema);
};