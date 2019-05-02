var express = require('express');
var app = express();
var router = express.Router();
var cntrMain = require('../controllers/main');
var modelMain = require("../models/modelMain");

/* GET home page. */
router.get('/', cntrMain.home)
router.post('/', modelMain.contactMessage)
router.get('/register', cntrMain.register)
router.post('/register', modelMain.postRegister)
router.get('/login', cntrMain.login)
router.post('/login', modelMain.postLogin)
router.get('/logout', cntrMain.logout)
router.get('/dashboard', cntrMain.dashboard)
router.get('/buySearch', cntrMain.loggedIn,modelMain.buySearch)
router.post('/buySearch', modelMain.postSearch)
router.get('/propertyDetails', cntrMain.propertyDetails)
router.get('/userListings',modelMain.userListings)
router.post('/delete',modelMain.deleteProperty)


module.exports = router;
