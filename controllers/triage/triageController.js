const utils = require('../../utils/utils');
const triageController=require('mongoose').model('Triage');
const Triage=require("../../database/triage/TriageCollection.js");
let triageEntity=new Triage(triageController);

const patientController=require('../user/patientController');
const medicController=require('../user/medicController');
const NotifyController=require('../notification/notifyController');
const errors=require('../../model/alert/errorMessagesAPI');


exports.getAll = async function (res) {
	try {
		let data = await triageEntity.getAllData();
		let array=[];
		for (item of data){
            if(item.patient.length>0){
                item.patient = await utils.decryptInternalPatient(item.patient[0]);
            }
            if(item.medic.length>0){
                item.medic = await utils.decryptInternalPatient(item.medic[0]);
            }
            array.push(item);
        }
		res.status(200).json(array);
	} catch (err) {
		res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
	}
}
exports.addTriage=async function(req,res)
{
	try
	{
		let medic=await validateMedic(req.body);
		let patient=await validatePatient(req.body);
		if(!medic)
		{
			res.status(400).json({error: errors.noMedicTriage,cause:"Triage Error"});
			return;
		}
		if(!patient)
		{
			res.status(400).json({error: errors.noPatientTriage,cause:"Triage Error"})
			return;
		}
		let newTriage= await triageEntity.create(req.body);
		if(req.body.notify){
			let notify=await NotifyController.createNotification(newTriage,req.body.notify.subject,req.body.notify.description);
			res.status(201).json({traige:newTriage,notify:notify});
			return;
		}
		res.status(201).json({traige:newTriage});
	}
	catch(err)
	{
		console.log(err.stack);
	 res.status(400).json({error: errors.noTriageCreate,cause: err.message});
	}
}
exports.addNotification=async function(req,res){
	try{
		let traige=triageEntity.getDocumentById(req.body.id);
		let notify=await NotifyController.createNotification(traige,req.body.subject,req.body.description);
      res.status(201).json({traige:traige,notify:notify});
			return;
	}catch(err){
		 res.status(400).json({error: errors.noNotifyCreate,cause: err.message});
	}
}
exports.getTriageByPatientId=async function(req,res)
{
	try
	{
		let triages=await getTriageByPatient(req.params.id);
		res.status(200).json(triages);
	}
	catch(err)
	{
		console.log(err.stack);
		res.status(400).json({error: errors.noPatientTriage,cause:"Triage Error"})
	}
}

async function getTriageByPatient(id)
{
	let triages= await triageEntity.getTriageByPatient(id);
	return triages;
}

async function validateMedic(triage)
{
	let medic=await medicController.getMedicById(triage.idMedic);
	return medic;
}

async function validatePatient(triage)
{
	let patient=await patientController.searchPatientByIdInternal(triage.idPatient);
	return patient;
}
