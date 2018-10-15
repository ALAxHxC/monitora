const mongoose = require('mongoose');
const userTypes = require('./userTypeController');
const patientController=require('mongoose').model('Patient');
const userController =require('./userController');
const medicController=require('./medicController');
const errors=require('../../model/alert/errorMessagesAPI');
const mycrypto=require('../../security/apiUtils');
const Patient = require('../../database/user/PatientCollection.js');
const utils = require('../../utils/utils');
let patientEntity=new Patient(patientController);

module.exports.getPatientesByMedic=async function(req,res){
	try{
		let result=await patientEntity.searchPatientByMedic(req.params.id);
		let descrypt=await decryptInternalPatients(result);
		res.status(200).json({
			status:200,
			entity: descrypt
		});
	}catch(err){
		console.log(err.stack,err.message);
		res.status(400).json({cause: errors.noPatientsFound,error: err.message});
	}
}

module.exports.createPatient= async function(req,res)
{
	try
	{
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
	   let entity = await patientEntity.searchPatientById(req.params.id);
	   console.log(entity[0].user[0])
	   if(entity[0].user[0]){
		entity[0].user = await utils.decryptInternalUser(entity[0].user[0]);
	   }
	  // entity.user = await utils.decryptInternalUser(entity.user);
	   res.status(200).json(entity[0]);
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
		entity=await decryptInternalPatient(entity);
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
	patient= await utils.encryptUpdateInternalUser(patient);
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
	
	console.log(err.message,err.stack,err);
	res.status(400).json({cause: errors.noPatientUpdated,error: err.message})
}
}
async function decryptInternalPatients(patientsList){
	let internal_patients=Array();
	//console.log(patientsList);
	for (let patient  of patientsList){
		let decrypt =await decryptInternalPatient(patient);
		internal_patients.push(decrypt);
	}
	return internal_patients;
}
async function decryptInternalPatient(patientInternal){
		patientInternal.firstNames = await mycrypto.decryptInternal(patientInternal.firstNames);
		patientInternal.lastNames = await mycrypto.decryptInternal(patientInternal.lastNames);
		
	  	patientInternal.document.identification=await mycrypto.decryptInternal(patientInternal.document.identification);
	  	patientInternal.document.type=await mycrypto.decryptInternal(patientInternal.document.type);
		return 	patientInternal;
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
