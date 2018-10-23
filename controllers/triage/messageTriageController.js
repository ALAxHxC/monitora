const utils = require('../../utils/utils');
const MessageTriage = require('../../database/triage/MessageTriage');
const patientController=require('../user/patientController');
const medicController=require('../user/medicController');
const errors=require('../../model/alert/errorMessagesAPI');
let messageTriage = new MessageTriage();

module.exports.sendMessageTriage= async function (req,res) {
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
		let newMessageTriage= await messageTriage.create(req.body);
		res.status(201).json(newMessageTriage);
	}
	catch(err)
	{
		console.log(err.stack);
	 res.status(400).json({error: errors.noTriageCreate,cause: err.message});
	}
}
module.exports.getMessagesByTriage=async function(id,res){
    try {
        let data = await messageTriage.getMessageByTriage(id);
        res.status(200).json(data);
    }catch(err)
	{
		console.log(err.stack);
	 res.status(400).json({error: errors.noTriageCreate,cause: err.message});
	}
}

async function validateMedic(messageTriage)
{
	let medic=await medicController.getMedicById(messageTriage.idMedic);
	return medic;
}
async function validatePatient(messageTriage)
{
	let patient=await patientController.searchPatientByIdInternal(messageTriage.idPatient);
	return patient;
}

