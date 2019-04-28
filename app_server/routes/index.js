var express = require('express');
var app = express();
var router = express.Router();
var cntrMain = require('../controllers/main');
var modelMain = require("../models/modelMain");

/* GET home page. */
router.get('/', cntrMain.home)
router.get('/register', cntrMain.register)
router.get('/login', cntrMain.login)
router.post('/register', cntrMain.postRegister)
router.post('/login', cntrMain.postLogin)
router.get('/dashboard', cntrMain.dashboard)

//New jade templates for final version
router.get('/buySearch', cntrMain.buySearch)



module.exports = router;
