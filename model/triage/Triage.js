exports = module.exports = function(app, mongoose) {
var mongoose = require('mongoose');
var apiSchema = new mongoose.Schema(
  { 
  idPatient: {type: mongoose.Schema.Types.ObjectId},
  idMedic: {type: mongoose.Schema.Types.ObjectId},
  description:{type: 'String'},
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  data: {
  	oximeter: {
  		pi: {type:Number},
  		spo2: {type: Number},
  		pulse: {type: Number}
  	},
  	glucose:{
  		gluco: {type: Number}
  	},
  	Weigth: {type: Number},
  	blodpressure:{
  		sys: {type: Number},
  		dias: {type: Number},
  		pulse: {type: Number}
  	}
  } 
  
  } 
  );
 mongoose.model('Triage', apiSchema);
};