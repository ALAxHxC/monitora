const Collection = require('../general/Collection.js');
const collection = require('mongoose').model('typification');
class TypificationCollection extends Collection {
  constructor() {
    super(collection);
  }
}
module.exports = TypificationCollection;