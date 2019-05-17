const Collection = require('../../database/classification/classificationCollection')
const TypificationCollection = require('../../database/classification/typificationCollection')
const errors = require('../../model/alert/errorMessagesAPI');
const entityManager = new Collection();
const entityTypification = new TypificationCollection();
const utils = require('../../utils/utils');

create = async (req, res) => {
  try {
    let data = req.body;
    data.typifications = await entityTypification.findIn(data.typifications);
    let entity = await entityManager.create(data)
    res.status(201).json(entity)
  } catch (err) {
    console.log(err.message, err.stack)
    res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
  }

}
remove = async (id, res) => {
  try {
    let entity = await entityManager.deleteDocumentById(id)
    res.status(201).json(entity)
  } catch (err) {
    console.log(err.message, err.stack)
    res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
  }


}
getAll = async (res) => {
  try {
    let entity = await entityManager.getAll()
    res.status(201).json(entity)
  } catch (err) {
    console.log(err.message, err.stack)
    res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
  }
}

getById = async (id, res) => {
  try {
    let entity = await entityManager.getDocumentById(id)
    res.status(201).json(entity)
  } catch (err) {
    console.log(err.message, err.stack)
    res.status(400).json({ error: errors.noTriageCreate, cause: err.message });
  }
}
module.exports = {
  create,
  remove,
  getAll,
  getById
}