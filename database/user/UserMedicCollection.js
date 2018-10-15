const Collection = require('../general/Collection.js'); 
const collection = require('mongoose').model('Medic');
const mongoose = require('mongoose');
class UserMedic extends Collection{
 constructor(){
 	super(collection);
	
 }
 async updateMedic(id, medic) {
	try {
		let updated = await super.entity.update({ _id: id },
			{
				$set: {
					firstNames: medic.firstNames,
					lastNames: medic.lastNames,
					description: medic.description,
					date: medic.date,
					especiality: medic.especiality
				}
			});
		return updated;
	} catch (err) {
		console.log(err.stack);
		throw (err);
	}
}
async medicById(id){
	try{
		let medic = await super.entity.aggregate([
			{ $match: {
			  _id:mongoose.Types.ObjectId(id)
		  }},
	 {
	   $lookup:
		 {
			from: "users",
			localField: "_id",
			foreignField: "userDetails",
			as: "user"
		}
	}]).exec();
	return medic;
	}catch(error){
		throw(error);
	}
}

}
module.exports = UserMedic;