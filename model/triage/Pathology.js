//Schema that define the model db class patology 
var mongoose = require('mongoose');

exports = module.exports = function(app, mongoose) {
var apiSchema = new mongoose.Schema(
  	{ 
	  name : { type: 'String', require: true},
	  description : { type: 'String', require: true},
	  treatment: {type: 'String', require: true},
	  createAt: { type: Date, default: Date.now },
	  updateAt: { type: Date, default: Date.now }
  	} 
  );
 mongoose.model('Pathology', apiSchema);
};