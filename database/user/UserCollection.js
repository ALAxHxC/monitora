const Collection = require('../general/Collection.js');
const mycrypto=require('../../security/apiUtils');
const userEntity = require('mongoose').model('User');

class User extends Collection{
 constructor(){
 	super(userEntity);
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

 async updatePassword(id,password){
	try{
	let updated= await super.entity.update({ _id: id }, { $set: { password: password }});
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
 async userByType(type,userDetails){
	 let data = await super.entity.findOne({userDetails:userDetails,type:type});
	 return data;
 }
 async findUserData(from,id){
 	let data=await super.entity.aggregate([
 		 { $match: {
            _id:id
        }},
   {
     $lookup:
       {
         from: from,
         localField: "userDetails",
         foreignField: "_id",
         as: "userData"
       }
  }]).exec();
 //	console.log(data);
 	return data;
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