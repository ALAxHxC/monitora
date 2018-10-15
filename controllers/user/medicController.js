
var errors = require('../../model/alert/errorMessagesAPI');
var mycrypto = require('../../security/apiUtils');

const UserMedic = require('../../database/user/UserMedicCollection.js');



var medicController = new UserMedic();
var UserTypeController = require('./userTypeController');
let utils = require('../../utils/utils');
module.exports.getMedicById = async function (id, res) {
	{
		try {
			let user = await medicController.medicById(id);
			//console.log(user);
			let data = await utils.decryptInternalPatient(user[0]);
			data.user=await utils.decryptInternalUser(data.user[0]);
			if(res)
			res.status(200).json(data);
			
			return data;
			
		} catch (err) {
			res.status(400).json({
				status: 400,
				message: "We can found medic"
			}); s
			throw (err);
		}
	}

}
async function getMedicById(id) {
	try {
		let user = await medicController.medicById(id);
		//console.log(user);
		return user;
	} catch (err) {
		throw (err);
	}
}

module.exports.updateMedicService = async function (req, res) {
	try {
		let id = req.params.id;
		let medic = req.body;
		console.log(id, medic)
		medic = await utils.encryptUpdateInternalUser(medic);
		let updateMedic = await medicController.updateMedic(id, medic);
		res.status(201).json(updateMedic);
	} catch (err) {
		console.log(err.stack);
		res.status(400).json({ cause: errors.noPatientUpdated, error: err.message })
	}
}
module.exports.createMedic = async function (user) {
	try {
		let medic = generateMedic(user);
		console.log(medic);
		let new_medic = await medicController.create(medic);
		console.log("Termino de crear");
		return new_medic;
	} catch (err) {
		console.log(err.stack);
		throw (err);
	}
}
function generateMedic(user) {
	let medic = {
		//idAdmin: new mongoose.mongo.ObjectId(),
		firstNames: user.userData.firstNames,
		lastNames: user.userData.lastNames,
		document:
		{
			identification: user.userData.document.identification,
			type: user.userData.document.type,
		},
		date: user.userData.date,
		medical_center: user.userData.medical_center,
		description: user.userData.description,
		especiality: user.userData.especiality,
		sesion: false
	};
	return medic;
}