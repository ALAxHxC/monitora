var express = require('express');
var router = express.Router();
var controller = require('../controllers/classification/typificationController');

/* GET users listing. */
router.post('/', function (req, res, next) {
  controller.create(req, res);
});
router.get('/', function (req, res, next) {
  controller.getAll(res)
})
router.get('/:id', function (req, res, next) {
  controller.getById(req.params.id, res)
})
router.delete('/:id', function (req, res, next) {
  controller.delete(req.params.id, res);
});

module.exports = router;