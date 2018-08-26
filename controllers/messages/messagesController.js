const Collection = require('../../database/messages/MessageCollection')
const patientController=require('../user/patientController');
const medicController=require('../user/medicController');
const errors=require('../../model/alert/errorMessagesAPI');
const entityManager=new Collection();
const fcmController=require('../../message/firebase');

createMessage=async (req,res)=>{
try{
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
    let new_meesage=await entityManager.create(req.body);
    res.status(201).json({message:new_meesage})
}catch(err){
    res.status(400).json({error: errors.noTriageCreate,cause: err.message});
}
}
getByMedic=async(id,res)=>{
    try{
        let messages=await entityManager.getMessagesByMedic(id);
        res.status(201).json(messages)
    }catch(err){
        res.status(400).json({error: errors.noTriageCreate,cause: err.message});
    }
}
getByPatient=async(id,res)=>{
    try{
        let messages=await entityManager.getMessagesByPatient(id);
        res.status(201).json(messages)
    }catch(err){
        res.status(400).json({error: errors.noTriageCreate,cause: err.message});
    }
}
updatePatientView=async(id,res)=>{
    try{
        let message=await entityManager.updateViewPatient(id);
        res.status(201).json(message)
    }catch(err){
        res.status(400).json({error: errors.noTriageCreate,cause: err.message});
    }
}

updateMedicView=async(id,res)=>{
    try{
        let message=await entityManager.updateViewMedic(id);
        res.status(201).json(message)
    }catch(err){
        res.status(400).json({error: errors.noTriageCreate,cause: err.message});
    }
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
module.exports={
    createMessage,
    getByMedic,
    getByPatient,
    updatePatientView,
    updateMedicView
}