const Collection = require('../general/Collection.js');
const collection = require('mongoose').model('classification');
class ClassificationCollection extends Collection {
  constructor() {
    super(collection);
  }
}
module.exports = ClassificationCollection;