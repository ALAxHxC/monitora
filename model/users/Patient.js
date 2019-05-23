
var mongoose = require('mongoose');

//Schema that define the model db class patient 
exports = module.exports = function (app, mongoose) {
  var apiSchema = new mongoose.Schema(
    {
      idMedic: { type: mongoose.Schema.Types.ObjectId, index: true, require: true },
      firstNames: { type: 'String' },
      lastNames: { type: 'String' },
      document: {
        identification: { type: 'String', unique: true },
        type: { type: 'String' }
      },
      date: { type: Date },
      description: { type: 'String' },
      profile_image: { type: 'String', default: null },
      images: { type: 'String', default: null },
      sesion: { type: Boolean, default: false },
      lastSesion: { type: Date, default: null },
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now },
      pathologys: [mongoose.Schema.Types.ObjectId],
      typification: ['String']
    }
  );
  mongoose.model('Patient', apiSchema);
};