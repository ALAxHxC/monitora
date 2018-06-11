
const Collection = require('../general/Collection.js'); 
class Notification extends Collection
{
	constructor(collection)
	{
		super(collection);
	}
    initNotification(triage,description,subject){
    	try{
		let Notify=super.entity;
		let new_entity=new Notify({
			idMedic: triage.idMedic,
			idPatient: triage.idPatient,
			idTriage: triage._id,
			description: description,
			subject: subject
		});
		return new_entity;
		}catch(err){
			throw(err);
		}
	}
}
module.exports = Notification;