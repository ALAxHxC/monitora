const Collection = require('../general/Collection.js');
const collection = require('mongoose').model('typification');
const mongoose = require('mongoose')
class TypificationCollection extends Collection {
  constructor() {
    super(collection);
  }
  async findIn(array) {
    try {
      array.map(item => {
        console.log(item)
        new mongoose.Types.ObjectId(item);
      })
      console.log('busca asi', array)
      let response = await super.entity.find({
        '_id': {
          $in: array
        }
      })
      return response;
    } catch (error) {
      throw (error);
    }

  }
}
module.exports = TypificationCollection;