var mongoose = require('mongoose');

///Schema that define the model db class user 
exports = module.exports = function(app, mongoose) 
{
  var apiSchema = new mongoose.Schema
  (
    { 
        username : { type: 'String', required : true, unique: true, index: true},
        password : { type: 'String',  required : true },
        userTypeDescription: {type: 'Number',  required : true , index: true},
        idFirebase: {type:'String', default: null},
        userDetails: 
        {
        	type: mongoose.Schema.Types.Mixed,
          required : true ,
        }
    } 
  );
mongoose.model('User', apiSchema);
};