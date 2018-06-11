exports = module.exports = function(app, mongoose) {
var mongoose = require('mongoose');
var apiSchema = new mongoose.Schema(
  { 
  username : { type: 'String', unique : true, required : true,index: true },
  password : { type: 'String', required : true},
      type: {
        description : {type: 'String', required : true },
        name: {type: 'String', required : true}
      }
  } 
  );
 mongoose.model('apiSchema', apiSchema);
};