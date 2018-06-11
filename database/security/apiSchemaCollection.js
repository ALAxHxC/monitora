const Collection = require('../general/Collection.js'); 
class ApiSchema extends Collection{
 constructor(collection){
 	super(collection);

 }
 async findUser(user,password){
 	try{
 	let apiSchema=await super.entity.findOne({username: user,password: password});
 	return apiSchema;
 	}catch(err){
 		console.log(err.stack);
 		throw(err);
 	}
 }

}
module.exports = ApiSchema;