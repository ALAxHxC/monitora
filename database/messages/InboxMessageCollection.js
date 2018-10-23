const Collection = require('../general/Collection.js'); 
const collection = require('mongoose').model('InboxMessage');
class InboxMessageCollection extends Collection
{
	constructor()
	{
		super(collection);
	}
	async getMessageByTriage(id){
		try{
			let data = await super.entity.find({idTriage:id});
			return data;
		}catch(err){
			throw(err)
		}
	}
	
}
module.exports = InboxMessageCollection;