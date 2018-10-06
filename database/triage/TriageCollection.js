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
}
module.exports = Triage;