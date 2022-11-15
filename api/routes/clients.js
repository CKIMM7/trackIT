const express = require('express');
const router = express.Router();
const clientsController = require('../controller/clients');
const auth = require('../controller/users');

router.get('/', auth.authorization ,clientsController.landingPage);

module.exports = router;
