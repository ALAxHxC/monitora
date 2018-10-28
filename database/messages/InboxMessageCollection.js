const Collection = require('../general/Collection.js');
const collection = require('mongoose').model('InboxMessage');
class InboxMessageCollection extends Collection {
	constructor() {
		super(collection);
	}

	async appendMessage(id, message) {
		try {
			console.log(message)
			let data = await super.entity.updateOne(
				{ "_id": id },
				{ $push: { messages: message } }
			);
			return data;
		} catch (err) {
			throw (err);
		}
	}
	async findByPatient(id) {
		try {
			let data = await super.entity.find({"idPatient":id});
			return data;
		} catch (err) {
			throw (err);
		}
	}
	async findByMedic(id) {
		try {
			let data = await super.entity.find({"idMedic":id});
			return data;
		} catch (err) {
			throw (err);
		}
	}

}
module.exports = InboxMessageCollection;