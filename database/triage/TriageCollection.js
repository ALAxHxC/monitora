const Collection = require('../general/Collection.js'); 

class Triage extends Collection
{
	constructor(collection)
	{
		super(collection);
	}
	async getTriageByPatient(idPatient)
	{
		let triage=await super.entity.find({idPatient:idPatient});
		return triage;
	}
}
module.exports = Triage;