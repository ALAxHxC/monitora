const Collection = require('../general/Collection.js'); 
const collection = require('mongoose').model('Medic');
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

}
module.exports = UserMedic;