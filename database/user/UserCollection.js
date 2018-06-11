const Collection = require('../general/Collection.js');
var mycrypto=require('../../security/apiUtils');
class User extends Collection{
 constructor(collection){
 	super(collection);
 }

 async login(userExternal,passwordExternal){
 		    let username=await mycrypto.decryptExternal(userExternal);
			let password=await mycrypto.decryptExternal(passwordExternal);
			console.log(username,password);
			let dbuser=await mycrypto.encryptInternal(username);
			let dbpass=await mycrypto.encryptInternal(password);
 	let user=await super.entity.findOne({username: dbuser, password: dbpass});
 		 
 		  username=await mycrypto.decryptInternal(user.username);
	      password=await mycrypto.decryptInternal(user.password);
		
			console.log(username,password);
		
			user.username=await mycrypto.encryptExternal(username);
			user.password=await mycrypto.encryptExternal(password);
 	return user;
 }
 async createUser(user){
 	
 	const username= await mycrypto.encryptExternal(user.username);
	const password= await mycrypto.encryptExternal(user.password);	
	user.password= await mycrypto.encryptInternal(user.password);
	user.username= await mycrypto.encryptInternal(user.username);
	let new_user=await super.entity.create(user);
	return {user: new_user, password: password, username: username};


 }
 async updateFirebaseId(id,idFirebase){
 	try{
 	let updated= await super.entity.update({ _id: id }, { $set: { idFirebase: idFirebase }});
 	return updated;
 }catch(err){
 	console.log(err.stack);
 	throw(err);
 }
 }

 async loginUser(username,password){
 	try{
 		let user= await super.entity.findOne({username: username, password: password});
 		return user;

 	}catch(err){
 		throw(err);
 		console.log(err.stack);
 	}
 }
 async findUsersByType(type,from)
 {
//await super.entity.find({'userTypeDescription': type }).exec();
 	
 	let users = await super.entity.aggregate([
   { $match: {
            userTypeDescription: type
        }},
   {
     $lookup:
       {
         from: from,
         localField: "userDetails",
         foreignField: "_id",
         as: "userData"
       }
  }
]).exec();
 	//console.log(users);
 	return users;
 }

}
module.exports = User;