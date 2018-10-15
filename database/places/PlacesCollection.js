const Collection = require('../general/Collection.js'); 
const entity=require('mongoose').model('Places');
const ObjectId = require('mongoose').Types.ObjectId; 
class Places extends Collection{
 constructor(){
 	super(entity);
 }
 
}
module.exports = Places;