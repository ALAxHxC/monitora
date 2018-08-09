
var errors=require('../../model/alert/errorMessagesAPI');
var mycrypto=require('../../security/apiUtils');

const UserMedic=require('../../database/user/UserMedicCollection.js');


var medicEntity =require('mongoose').model('Medic');
var medicController=new UserMedic(medicEntity);
var UserTypeController=require('./userTypeController');

module.exports.getMedicById=async function(id)
{
	return getMedicById(id);
}
 async function getMedicById(id)
 {
 	try{
 	//console.log(newid);
 	let user=await medicController.getDocumentById(id);
 	console.log(user);
 	return user;
 }catch(err){
 	throw(err);
 }
 }

 async function updateMedic(medic)
 {
 	let newMedic=await medic.save();
 	return newMedic;
 }
exports.createMedic=async function(user)
{
	try{
	let medic=generateMedic(user);
	console.log(medic);
	let new_medic=await medicController.create(medic);
	console.log("Termino de crear");
	return new_medic;
}catch(err)
	{	console.log(err.stack);
		throw(err);
	}
}
 function generateMedic(user)
{
	let medic={
	 	//idAdmin: new mongoose.mongo.ObjectId(),
	 	firstNames: user.userData.firstNames,
	 	lastNames: user.userData.lastNames,
	 	document:
	 	{
	 		identification:user.userData.document.identification,
	 		type: user.userData.document.type,
	 	},
	 	date: user.userData.date,
	 	description: user.userData.description,
	 	especiality: user.userData.especiality,
 		sesion: false
 	};
	return medic;
}