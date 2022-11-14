const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

router.get('/', usersController.displayAll);
router.get('/:id', usersController.getUser);
router.post('/', usersController.create);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;