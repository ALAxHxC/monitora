const patientManager = require('../../database/user/PatientCollection');
const patientManagerEntity=new patientManager();
const errors=require('../../model/alert/errorMessagesAPI');
module.exports.getAll= async (res)=>{
    try{
        let data=await patientManagerEntity.getAll();
        res.status(200).json(data);
    }catch(err){
        res.status(400).json({error: errors.noPatientsFound,cause: err.message});
    }
}