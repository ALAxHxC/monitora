var mongoose = require('mongoose');

exports = module.exports = function(app, mongoose) 
{
  var apiSchema = new mongoose.Schema
  (
    {
      idMedic: {type: mongoose.Schema.Types.ObjectId, index: true},
      idPatient:  {type: mongoose.Schema.Types.ObjectId, index: true},
      subject: {type: 'String', required: true },
      description: {type: 'String', required: true },
      response: {type:  mongoose.Schema.Types.Mixed, default: null},
      patient_view:{type: Boolean, default: false},
      medic_view:{type: Boolean, default: false},
      close:{type: Boolean, default: false },
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now }
    } 
  );
 mongoose.model('Message', apiSchema);
};