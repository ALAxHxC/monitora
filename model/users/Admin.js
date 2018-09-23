var mongoose = require('mongoose');

//Schema that define the model db class admin 
exports = module.exports = function(app, mongoose) {
var apiSchema = new mongoose.Schema
(
  { 
    firstNames : { type: 'String'},
    lastNames : { type: 'String'},
    document: {
    	identification :{ type: 'String',unique: true},
    	type: {type: 'String'}
    },    
    sesion: {type: Boolean, default: false},
    lastSesion: { type: Date, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  } 
);
 mongoose.model('Admin', apiSchema);
};