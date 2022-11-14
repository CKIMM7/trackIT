const express = require('express');
const router = express.Router();
const habitsController = require('../controller/habits')

router.get('/', habitsController.displayAll);
router.get('/:id', habitsController.getHabit);
router.post('/', habitsController.create);
router.patch('/:id', habitsController.update);
router.delete('/:id', habitsController.destroy);

module.exports = router;