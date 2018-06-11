var mongoose = require('mongoose');
var patientController=require('mongoose').model('Patient');
var medicController=require('./medicController');
var errors=require('../../model/alert/errorMessagesAPI');
var mycrypto=require('../../security/apiUtils');
const Patient = require('../../database/user/PatientCollection.js');

let patientEntity=new Patient(patientController);

module.exports.createPatient= async function(req,res)
{
	try
	{
		console.log("Creacion de paciente");
		let patient=req.body;
		let result=await patientEntity.createPatient(patient);
		res.status(201).json
		(
			{
				response:"patient create",
	     	  	status: 201,
	     	  	entity: result._id,
			}
		);
	}
	catch(err)
	{
		res.status(400).json({cause: errors.noPatientCreate,error: err.message});
	}	
}

module.exports.searchPatientByIdInternal= async function(id)
{
	try{
	let patient=await patientController.findById(id);
		return patient;
}catch(err){
	console.log(err.stack,err.message);
	return null;
}
}

module.exports.searchPatientById= async function(req,res)
{
	try
	{
	   let entity= await patientEntity.getDocumentById(req.params.id);
	  // console.log(entity);
	   entity=await patientInternalToExternal(entity);
	   res.status(201).json(entity);
	}
	catch(err)
	{
		console.log(err.stack);
		res.status(400).json({cause: errors.noPatientCreate,error: err.message});
	};
}

module.exports.searchPatientByIdentity= async function(req,res)
{
	try
	{
		console.log(req.params.id);
		let id=await  mycrypto.encryptInternal(req.params.id);
		let entity= await patientEntity.searchPatientByIdentification(id);
		entity=await patientInternalToExternal(entity);
		res.status(201).json(entity);
	}
	catch(err)
	{
		console.log(err.stack);
		res.status(400).json({cause: errors.noPatientCreate,error: err.message});
	};
}
module.exports.updatePatientService=async function(req,res){
	try{
		let id=req.params.id;
		let patient=req.body;
		console.log(id,patient)
	patient= await patientExternalToInternal(patient);
	let updatePatient=await patientEntity.updatePatient(id,patient);
	res.status(201).json(updatePatient);
}catch(err){
	console.log(err.stack);
	res.status(400).json({cause: errors.noPatientUpdated,error: err.message})
}
}
module.exports.updateIdMedic=async function(req,res){
	try{
	let patient_updated=await patientEntity.updateMedic(req.params.id,req.params.idMedic);
	res.status(201).json(patient_updated);
}catch(err){
	
	console.log(err.stack);
	res.status(400).json({cause: errors.noPatientUpdated,error: err.message})
}
}
async  function patientInternalToExternal(patientInternal)
 {
		let firstNames = await mycrypto.decryptInternal(patientInternal.firstNames);
		let lastNames = await mycrypto.decryptInternal(patientInternal.lastNames);
		
	  	patientInternal.document.identification=await mycrypto.decryptInternal(patientInternal.document.identification);
	  	patientInternal.document.type=await mycrypto.decryptInternal(patientInternal.document.type);

		console.log(firstNames,lastNames);
		patientInternal.firstNames=await mycrypto.encryptExternal(firstNames);
		patientInternal.lastNames= await mycrypto.encryptExternal(lastNames);
		return patientInternal;

}
async function patientExternalToInternal(patientExternal){
	let firstNames=await mycrypto.decryptExternal(patientExternal.firstNames);
	let lastNames= await mycrypto.decryptExternal(patientExternal.lastNames);
	console.log(firstNames,lastNames);
    	

	patientExternal.firstNames=await mycrypto.encryptInternal(firstNames);
	patientExternal.lastNames= await mycrypto.encryptInternal(lastNames);
	return patientExternal;

}
async function createPatient(entity,medic,res)
{
	try
	{
	    let newPatient= new patientController
	    (
		    {
				idMedic:  medic._id,
				firstNames: await mycrypto.encryptInternal(entity.firstNames),
				lastNames: await mycrypto.encryptInternal(entity.lastNames),
				document: {
		      	identification : await  mycrypto.encryptInternal(entity.document.identification),
		    	type: await  mycrypto.encryptInternal(entity.document.type)
		        },
		  		date: new Date(entity.date),
		  		description: entity.description,
		  		pathologys: entity.pathologys
			}
		);
		console.log(newPatient);
		return newPatient;
	}
	catch(err)
	{
		res.status(400).json({cause: errors.noPatientCreate,error: err.message});
	}
}

module.exports.updatePatient=async function(id,patient){
	try{
	patient= await patientExternalToInternal(patient);
	let updatePatient=await patientEntity.updatePatient(id,patient);
}catch(err){
	console.log(err.stack);
	throw(err);
}

}

function generatePatient(user)
{

	 let patient={
	 	firstNames: user.user_details.firstNames,
	 	lastNames: user.user_details.lastNames,
	 	document:
	 	{
	 		identification:user.user_details.document.identification,
	 		type: user.user_details.document.type,
	 	},
	 	idMedic: user.user_details.idMedic,
	 	sesion: false
	 };
	return patient;
}
