const patientManager = require('../../database/user/PatientCollection');
const patientManagerEntity = new patientManager();
const errors = require('../../model/alert/errorMessagesAPI');
const mycrypto = require('../../security/apiUtils');




module.exports.getAll = async (res) => {
	try {
		let data = await patientManagerEntity.getAll();
		let descrypt = await decryptInternalPatients(data);
		res.status(200).json(descrypt);
	} catch (err) {
		res.status(400).json({ error: errors.noPatientsFound, cause: err.message });
	}
}
async function decryptInternalPatients(patientsList) {
	let internal_patients = Array();
	//console.log(patientsList);
	for (let patient of patientsList) {
		let decrypt = await decryptInternalPatient(patient);
		internal_patients.push(decrypt);
	}
	return internal_patients;
}
async function decryptInternalPatient(patientInternal) {
	patientInternal.firstNames = await mycrypto.decryptInternal(patientInternal.firstNames);
	patientInternal.lastNames = await mycrypto.decryptInternal(patientInternal.lastNames);

	patientInternal.document.identification = await mycrypto.decryptInternal(patientInternal.document.identification);
	patientInternal.document.type = await mycrypto.decryptInternal(patientInternal.document.type);
	return patientInternal;
}