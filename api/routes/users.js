const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

router.get('/', usersController.displayAll)

module.exports = router;