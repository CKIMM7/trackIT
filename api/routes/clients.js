const express = require('express');
const router = express.Router();
const clientsController = require('../controller/clients');
const usersController = require('../controller/users');
const auth = require('../controller/users');

router.get('/', clientsController.landingPage);
router.get('/login', clientsController.loginPage);
router.get('/signup', clientsController.signUpPage);
router.get('/dashboard', clientsController.dashboardPage);
router.get('/profile', clientsController.profilePage);
router.get('/habit', usersController.authorization, clientsController.habitPage);

//original // router.get('/habit/:id', usersController.authorization, usersController.habitCheck, clientsController.habitPage);
router.get('/habit/:id', usersController.authorization, clientsController.habitPage);

router.post('/auth', usersController.authorization, usersController.returnGlobal);    
router.get('/test', clientsController.testPage);

module.exports = router;
