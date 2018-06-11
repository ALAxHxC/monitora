
function createResponse(status,cause,message){
	return {
	status: status,
	cause: cause,
	message: message
	};
}

var noApiFound=createResponse(2000, "ApiSchema Error", "We can search ApiSchema");
var noUserType=createResponse(2001,"User error","no user type found");
var noUserCreate=createResponse(2003, "User error","We cant create user");
var noUserSearch=createResponse(2002, "User error", "We cant search user");
var noUserFound=createResponse(2004, "User error", "No user found");
var noMedicFound=createResponse(2005, "User error", "No medic found");
var noPatientCreate=createResponse(2006, "Patient error", "We cant create patient");
var noPatientUpdated=createResponse(2016, "Patient error", "We cant update patient");
var noUserGet=createResponse(2007, "User Error", "We cant retrive info");
var noUserUpdate=createResponse(2008, "User Error", "We cant update info");
var noUserTypeGet=createResponse(2009,"User type error", "We cant retrive");
var noUserTypeUpdate=createResponse(2010,"User type error", "We update data");
var noTriageCreate=createResponse(2011, "Triage Create", "We can create Triage");
var noMedicFound=createResponse(2012, "User error", "No medic found");
var noMedicTriage=createResponse(2013, "Triage error", "No medic found");
var noPatientTriage=createResponse(2014, "Triage error", "No patient found");
var noFirebaseIdUpdate=createResponse(2015, "User Error error", "No firebase updated");
var noNotifyCreate=createResponse(2016, "Triage Error", "No notify created");
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
