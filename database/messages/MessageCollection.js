const Collection = require('../general/Collection.js'); 
const entity=require('mongoose').model('Message');
const ObjectId = require('mongoose').Types.ObjectId; 
class Message extends Collection{
 constructor(){
 	super(entity);
 }
 async getAllData(){
	 try{
				let data= await super.entity.aggregate([
					{
					 $lookup:
					   {
						 from: "medics",
						 localField: "idMedic",
						 foreignField: "_id",
						 as: "medic"
					   }
				  },
				  {
				   $lookup:
					   {
						 from: "patients",
						 localField: "idPatient",
						 foreignField: "_id",
						 as: "patient"
					   }
				  }
				]).exec();
				return data;
	 }catch(err){
		 throw(err);
	 }
 }
 async getMessagesByMedic(id){
	 try{
	 let messages= await entity.find({idMedic:id}).sort({'createAt':-1});
	return messages;
	}catch(err){
		throw(err)
	}
}
async getMessagesByPatient(id){
	try{
	let messages= await entity.find({idPatient:id}).sort({'createAt':-1});
   return messages;
   }catch(err){
	   throw(err)
   }
}
async updateViewPatient(id){
	try{
	let message=await super.entity.update({ _id: id }, { $set: { patient_view: true }});
	return message;
	}catch(err){
		throw(err)
	}
}

async updateViewMedic(id){
	try{
	let message=await super.entity.update({ _id: id }, { $set: { medic_view: true }});
	return message;
	}catch(err){
		throw(err);
	}
}
}
module.exports = Message;