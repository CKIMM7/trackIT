const express = require('express');
const router = express.Router();
const clientsController = require('../controller/clients');
const auth = require('../controller/users');

router.get('/', clientsController.landingPage);
router.get('/login', clientsController.loginPage);
router.get('/signup', clientsController.signUpPage);
router.get('/test', clientsController.testPage);

module.exports = router;
