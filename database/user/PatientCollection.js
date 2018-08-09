var medicController=require('../../controllers/user/medicController');
var mycrypto=require('../../security/apiUtils');
const Collection = require('../general/Collection.js'); 

class Patient extends Collection
{
	constructor(collection)
	{
		super(collection);
	}

	async createPatient(patient)
	{
		try{
			console.log(patient);
	 	let medic=await medicController.getMedicById(patient.idMedic);
	 	if(!medic){throw("Medic not found");}
	 	console.log("Medico",medic);
		let new_patient= await this.encrytInteralPatientgeneratePatient(patient,medic);
		new_patient= await super.create(new_patient);
		return new_patient;
	}catch(err){
		console.log("Traza del error",err.message);
		throw(err);
	}
	}
 	async searchPatientByMedic(idMedic){
 		try{
 			let patients=await super.entity.find({idMedic:idMedic});
 			return patients;
 		}catch(err){
 			throw(err);
 		}
 	}
	async searchPatientByIdentification(identification)
	{
		try{
 		let patient=await super.entity.findOne({'document.identification':identification});
 		return patient;
		}catch(err){
			throw(err);
		}
	}
	async updatePatient(id,patient){
			try{
 	let updated= await super.entity.update({ _id: id }, 
 			{ $set: { 
 					firstNames: patient.firstNames,
 					lastNames: patient.lastNames,
 					description: patient.description,
 					date: patient.date
 				    }
 	});
 	return updated;
 	}catch(err){
 	console.log(err.stack);
 	throw(err);
 }
	}
	async updateMedic(id,idMedic){
				try{
	let medic=await medicController.getMedicById(idMedic);
	 	if(!medic){throw("Medic not found");}
 	let updated= await super.entity.update({ _id: id }, 
 			{ $set: { 
 					idMedic:idMedic
 				    }
 	});
 	return updated;
 	}catch(err){
 	console.log(err.stack);
 	throw(err);
 }		
	}
	async encrytInteralPatientgeneratePatient(entity,medic)
	{
		//console.log(super.entity);
		let patient=super.entity;
		let newPatient= new patient
		(
			{
				idMedic:  medic._id,
				firstNames: await mycrypto.encryptInternal(entity.firstNames),
				lastNames: await mycrypto.encryptInternal(entity.lastNames),
				document: 
				{
			      	identification : await mycrypto.encryptInternal(entity.document.identification),
			    	type: await mycrypto.encryptInternal(entity.document.type)
			    },
		  		date: new Date(entity.date),
		  		description: entity.description,
		  		pathologys: entity.pathologys
			}
		);
		console.log(newPatient);
		return newPatient;
    }
}
module.exports = Patient;
