exports = module.exports = function(app, mongoose) {
    var mongoose = require('mongoose');
    var apiSchema = new mongoose.Schema(
      { 
      name:{type: 'String', require: true, unique: true},
      description: {type: 'String', require: true},
      geospacial: mongoose.Schema.Types.Mixed,
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now }
      } 
      );
     mongoose.model('Places', apiSchema);
    };