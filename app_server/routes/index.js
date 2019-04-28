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
router.post('/search', cntrMain.search)
router.get('/about', cntrMain.about)
router.get('/survey', cntrMain.survey)
router.get('/data', cntrMain.options)
router.get('/admin', cntrMain.admin)
router.post('/admin', modelMain.post_adddest)
router.post('/data', modelMain.post_loaddataset)
router.get('/userlist', modelMain.get_destinations)
router.get('/update', cntrMain.update)
router.post('/update', modelMain.searchCity)
router.post('/deletedest', modelMain.post_deletedest)
router.post('/updatedest', modelMain.post_updatedest)
router.get('/dashboard', cntrMain.dashboard)

//New jade templates for final version
router.get('/buySearch', cntrMain.buySearch)



module.exports = router;
