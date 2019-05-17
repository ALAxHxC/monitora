let Schema = require('mongoose').Schema;
exports = module.exports = function (app, mongoose) {
  var apiSchema = new mongoose.Schema
    (
      {
        name: String,
        description: String,
        typifications: [Schema.Types.ObjectId]
      }, {
        timestamps: true
      }
    );
  mongoose.model('classification', apiSchema);
};