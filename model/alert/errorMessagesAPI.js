
function createResponse(status,cause,message,message_es,message_en){
	return {
	status: status,
	cause: cause,
	message: message,
	message_es:message_es,
	message_en:message_en
	};
}

const noApiFound=createResponse(2000, "ApiSchema Error", "We can search ApiSchema","Datos no encontrados","Datos encontrados");
const noUserType=createResponse(2001,"User error","no user type found","No se encuentra el tipo de usuario","No se encuentra el tipo de usuario");
const noUserCreate=createResponse(2003, "User error","We cant create user","No pudimos crear el usuario","no pudimos crear el usuario");
const noUserSearch=createResponse(2002, "User error", "We cant search user","No pudimos crear el usuario","No pudimos crear el usuario");
const noUserFound=createResponse(2004, "User error", "No user found","No se encuentra el usuario","No se encuentra el usuario");
const noMedicFound=createResponse(2005, "User error", "No medic found","Médico no encontrado","Médico no encontrado");
const noPatientCreate=createResponse(2006, "Patient error", "We cant create patient","No pudimos crear el paciente","No pudimos crear el paciente");
const noPatientsFound=createResponse(2019, "Patients error", "We not found patients","No encontramos pacientes","No encontramos pacientes");
const noPatientUpdated=createResponse(2016, "Patient error", "We cant update patient","No pudimos actualizar el paciente","No puidmos actualizar el paciente");
const noUserGet=createResponse(2007, "User Error", "We cant retrive info","No pudimos consultar la información","No pudimos consultar la información");
const noUserUpdate=createResponse(2008, "User Error", "We cant update info");
const noUserTypeGet=createResponse(2009,"User type error", "We cant retrive","No pudimos actualizar la información","No pudimos actualizar la información");
const noUserTypeUpdate=createResponse(2010,"User type error", "We update data","No pudimos consultar la información","No pudimos consultar la información");
const noTriageCreate=createResponse(2011, "Triage Create", "We can create Triage","No pudimos registrar el traige","No pudimos registrar el traige");
const noMedicTriage=createResponse(2013, "Triage error", "No medic found","No encontramos médicos","No encontramos médicos");
const noPatientTriage=createResponse(2014, "Triage error", "No patient found","No encontramos pacientes","No encontramos pacientes");
const noFirebaseIdUpdate=createResponse(2015, "User Error error", "No firebase updated","No hay servicio disponible","Sin servicio");
const noNotifyCreate=createResponse(2016, "Triage Error", "No notify created","no pudimos enviar la notifación","No pudimos enviar la notifación");
module.exports = {
	noApiFound:noApiFound,
	noUserType: noUserType,
	noUserCreate: noUserCreate,
	noUserSearch: noUserSearch,
	noUserFound:noUserFound,
	noPatientCreate:noPatientCreate,
	noMedicFound:noMedicFound,
	noUserGet: noUserGet,
	noUserUpdate: noUserUpdate,
	noUserTypeGet: noUserTypeGet,
	noTriageCreate : noTriageCreate,
	noMedicTriage: noMedicTriage,
	noPatientTriage: noPatientTriage,
	noFirebaseIdUpdate:noFirebaseIdUpdate,
	noNotifyCreate:noNotifyCreate

};
