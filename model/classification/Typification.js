exports = module.exports = function (app, mongoose) {
  var apiSchema = new mongoose.Schema
    (
      {
        name: String,
        description: String
      }, {
        timestamps: true
      }
    );
  mongoose.model('typification', apiSchema);
};