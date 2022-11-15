const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

router.get('/', usersController.authorization ,usersController.displayAll);
router.get('/:id', usersController.getUser);
router.get('/:id/habits', usersController.getHabits);
router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
