var express = require('express');
var app = express();
var router = express.Router();
var cntrMain = require('../controllers/main');
var modelMain = require("../models/modelMain");

/* GET home page. */
router.get('/', cntrMain.home)
router.get('/register', cntrMain.register)
router.get('/login', cntrMain.login)
router.post('/register', modelMain.postRegister)
router.post('/login', modelMain.postLogin)
router.get('/dashboard', cntrMain.dashboard)

//New jade templates for final version
router.get('/buySearch', modelMain.buySearch)
router.post('/buySearch', modelMain.postSearch)
router.get('/propertyDetails', cntrMain.propertyDetails)



module.exports = router;
