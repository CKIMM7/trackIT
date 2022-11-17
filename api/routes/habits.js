const express = require('express');
const router = express.Router();
const habitsController = require('../controller/habits');
const usersController = require('../controller/users');

router.get('/', habitsController.displayAll);
router.get('/:id', usersController.authorization, habitsController.getHabit);
router.get('/:id/test', habitsController.getHabit);
router.post('/', habitsController.create);
router.patch('/:id', habitsController.update);
router.delete('/:id', habitsController.destroy);

module.exports = router;
