const Collection = require('../general/Collection.js');
class User_Type extends Collection{
	constructor(collection){
		super(collection);
	}
	async getUserTypeById(idType){
		try{
		let user_type=await super.entity.findOne({idType:idType});
		return user_type;
		}catch(err){
			console.log(err.stack);
			throw(err);
		}
	}
	
	
}
module.exports = User_Type;