const Collection = require('../general/Collection.js'); 

class Triage extends Collection
{
	constructor(collection)
	{
		super(collection);
	}
	async getTriageByPatient(idPatient)
	{
		let triage=await super.entity.find({idPatient:idPatient})
		.sort({'createAt':-1});
		return triage;
	}
}
module.exports = Triage;