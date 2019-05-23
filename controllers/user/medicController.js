
const errors = require('../../model/alert/errorMessagesAPI');
const mycrypto = require('../../security/apiUtils');
const UserMedic = require('../../database/user/UserMedicCollection');
const medicController = new UserMedic();
const UserTypeController = require('./userTypeController');
const utils = require('../../utils/utils');



module.exports.appendSpecialityypes = async (req, res) => {
	try {
		let update = await medicController.updateOne({
			_id: req.params.id
		}, { $addToSet: { especialities: req.params.type } })
		res.status(200).json(update)
		return;
	} catch (err) {
		res.status(400).json({ message: err.message, stack: err.stack })
	}
}
module.exports.deleteSpecialityTypes = async (req, res) => {
	try {
		let update = await medicController.updateOne({
			_id: req.params.id
		}, { $pullAll: { especialities: [req.params.event] } })
		res.status(200).json(update)
		return;
	} catch (err) {
		res.status(400).json({ message: err.message, stack: err.stack })
	}
}

module.exports.appendMedicTypes = async (req, res) => {
	try {
		let update = await medicController.updateOne({
			_id: req.params.id
		}, { $addToSet: { typification: req.params.type } })
		res.status(200).json(update)
		return;
	} catch (err) {
		res.status(400).json({ message: err.message, stack: err.stack })
	}
}
module.exports.deleteMedicTypes = async (req, res) => {
	try {
		let update = await medicController.updateOne({
			_id: req.params.id
		}, { $pullAll: { typification: [req.params.event] } })
		res.status(200).json(update)
		return;
	} catch (err) {
		res.status(400).json({ message: err.message, stack: err.stack })
	}
}

module.exports.getMedicById = async function (id, res) {
	{
		try {
			let user = await medicController.medicById(id);
			//console.log(user);
			let data = await utils.decryptInternalPatient(user[0]);
			data.user = await utils.decryptInternalUser(data.user[0]);
			if (res)
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
module.exports.getInternalMedic = async function (id) {
	try {
		let user = await medicController.getDocumentById(id);
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
		medic = await utils.encryptInternalUser(medic);
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