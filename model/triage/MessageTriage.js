exports = module.exports = function (app, mongoose) {
  let apiSchema = new mongoose.Schema(
    {
      idTriage: { type: mongoose.Schema.Types.ObjectId},
      idPatient: { type: mongoose.Schema.Types.ObjectId },
      idMedic: { type: mongoose.Schema.Types.ObjectId },
      message: { type: 'String' },
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: Date.now },
    }
  );
  mongoose.model('MessagesTriages', apiSchema);
};