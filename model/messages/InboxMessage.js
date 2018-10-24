exports = module.exports = function(app, mongoose) 
{
  var apiSchema = new mongoose.Schema
  (
    {
      idMedic: {type: mongoose.Schema.Types.ObjectId, index: true},
      idPatient:  {type: mongoose.Schema.Types.ObjectId, index: true},
      subject: {type: 'String', required: true },
      patient_view:{type: Boolean, default: false},
      medic_view:{type: Boolean, default: false},
      close:{type: Boolean, default: false },
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now },
      messages: [
        {name: String, message: String, createAt: { type: Date, default: Date.now }}
      ]
    } 
  );
 mongoose.model('InboxMessage', apiSchema);
};