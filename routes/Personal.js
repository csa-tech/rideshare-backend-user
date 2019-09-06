var express = require('express');
var pageviewCtrl = require('../controllers/pageviewCtrl'); // import the controller
var router = express.Router();

router.get('/user', function(req, res, next) {
  pageviewCtrl.InputPersonal(req, res, next);
});

// 这个处理POST方法的“修改”
router.post('/user', function(req, res, next) {
  pageviewCtrl.Getpersonal(req, res, next);
});

module.exports = router;