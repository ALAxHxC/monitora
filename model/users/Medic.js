var mongoose = require('mongoose');

exports = module.exports = function (app, mongoose) {
  var apiSchema = new mongoose.Schema
    (
      {
        firstNames: { type: 'String' },
        lastNames: { type: 'String' },
        document:
        {
          identification: { type: 'String', unique: true },
          type: { type: 'String' }
        },
        date: { type: Date },
        description: { type: 'String' },
        especialities: ['String'],
        typification: ['String'],
        medical_center: { type: 'String', default: null },
        sesion: { type: Boolean, default: false },
        lastSesion: { type: Date, default: null },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now }
      }
    );
  mongoose.model('Medic', apiSchema);
};