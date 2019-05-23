var express = require('express');
var router = express.Router();
var userController = require('../controllers/user/userController');
let medicController = require('../controllers/user/medicController');
router.patch('/medic/:id', function (req, res) {
  userController.updateMedic(req, res);
});
router.get('/', function (req, res, next) {
  userController.getMedics(req, res);
});
router.get('/search/:id', function (req, res, next) {
  medicController.getMedicById(req.params.id, res);
});
router.post('/', function (req, res, next) {
  userController.createUserMedic(req, res);
});
router.patch('/:id', function (req, res, next) {
  medicController.updateMedicService(req, res)
})



router.post('/speciality/:id/:type', function (req, res, next) {
  medicController.appendSpecialityypes(req, res);
  //res.send('respond with a resource');
});

router.delete('/speciality/:id/:type', function (req, res, next) {
  medicController.deleteSpecialityTypes(req, res);
  //res.send('respond with a resource');
});

router.post('/type/:id/:type', function (req, res, next) {
  medicController.appendMedicTypes(req, res);
  //res.send('respond with a resource');
});

router.delete('/type/:id/:type', function (req, res, next) {
  medicController.deleteMedicTypes(req, res);
  //res.send('respond with a resource');
});

module.exports = router;
