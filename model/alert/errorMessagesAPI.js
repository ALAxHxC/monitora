
function createResponse(status,cause,message){
	return {
	status: status,
	cause: cause,
	message: message
	};
}

const noApiFound=createResponse(2000, "ApiSchema Error", "We can search ApiSchema");
const noUserType=createResponse(2001,"User error","no user type found");
const noUserCreate=createResponse(2003, "User error","We cant create user");
const noUserSearch=createResponse(2002, "User error", "We cant search user");
const noUserFound=createResponse(2004, "User error", "No user found");
const noMedicFound=createResponse(2005, "User error", "No medic found");
const noPatientCreate=createResponse(2006, "Patient error", "We cant create patient");
const noPatientsFound=createResponse(2019, "Patients error", "We not found patients");
const noPatientUpdated=createResponse(2016, "Patient error", "We cant update patient");
const noUserGet=createResponse(2007, "User Error", "We cant retrive info");
const noUserUpdate=createResponse(2008, "User Error", "We cant update info");
const noUserTypeGet=createResponse(2009,"User type error", "We cant retrive");
const noUserTypeUpdate=createResponse(2010,"User type error", "We update data");
const noTriageCreate=createResponse(2011, "Triage Create", "We can create Triage");
const noMedicTriage=createResponse(2013, "Triage error", "No medic found");
const noPatientTriage=createResponse(2014, "Triage error", "No patient found");
const noFirebaseIdUpdate=createResponse(2015, "User Error error", "No firebase updated");
const noNotifyCreate=createResponse(2016, "Triage Error", "No notify created");
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
