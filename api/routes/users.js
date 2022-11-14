const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

router.get('/', usersController.displayAll);
router.get('/:id', usersController.getUser);
router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
