const Collection = require('../../database/messages/InboxMessageCollection')
const patientController = require('../user/patientController');
const medicController = require('../user/medicController');
const errors = require('../../model/alert/errorMessagesAPI');
const entityManager = new Collection();
const utils = require('../../utils/utils');
const fcmController = require('../../message/firebase');

createMessage = async (req, res) => {
    try {
        let medic = await validateMedic(req.body);
        let patient = await validatePatient(req.body);

        if (!medic) {
            res.status(400).json({ error: errors.noMedicTriage, cause: "Triage Error" });
            return;
        }
        if (!patient) {
            res.status(400).json({ error: errors.noPatientTriage, cause: "Triage Error" })
            return;
        }
        let message = req.body;
        message.patient = patient;
        message.medic = medic;
        let new_meesage = await entityManager.create(message);
        res.status(201).json({ message: new_meesage })
    } catch (err) {
        console.log(err.message, err.stack)
        res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
    }
}
getInboxById = async (id, res) => {
    try {
        let inbox = await entityManager.getDocumentById(id);
        res.status(200).json(inbox);
    }
    catch (err) {
        res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
    }
}

getByMedic = async (id, res) => {
    try {
        let messages = await entityManager.findByMedic(id);
        res.status(201).json(messages)
    } catch (err) {
        console.log(err.message, err.stack)
        res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
    }
}
getByPatient = async (id, res) => {
    try {
        let messages = await entityManager.findByPatient(id);
        res.status(201).json(messages)
    } catch (err) {
        console.log(err.message, err.stack)
        res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
    }
}
addMessage = async (id, message_append, res) => {
    try {
        let message = await entityManager.getDocumentById(id)
        console.log(message)
        if (utils.dateisOld(message.createAt)) {
            console.log("Es menor", utils.dateisOld(message.createAt));
            let updated = await entityManager.appendMessage(id, message_append)
            res.status(201).json(updated);
            return;
        }
        res.status(400).json({ error: errors.noMessageSend, cause: err.message });
    } catch (err) {
        console.log(err.message, err.stack)
        res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
    }
}

async function validateMedic(triage) {
    let medic = await medicController.getInternalMedic(triage.idMedic);
    medic = await utils.decryptInternalPatient(medic)
    return medic;
}

async function validatePatient(triage) {
    let patient = await patientController.searchPatientByIdInternal(triage.idPatient);
    patient = await utils.decryptInternalPatient(patient);
    return patient;
}
module.exports = {
    createMessage,
    getByMedic,
    getByPatient,
    addMessage,
    getInboxById

}