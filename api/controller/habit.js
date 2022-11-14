const Habit = require('../models/Habit');

const displayAll = async (req, res) => {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getHabit = async (req, res) => {
    try {
        const habit = await Habit.findHabit(parseInt(req.params.id))
        res.json()
    } catch(err){
        res.status(404).json({err})
    }
}

const create = async (req, res) => {
    try {
        const habit = await Habit.create(req.body.name, req.body.desc, req.body.freq, req.body.start_date)
        res.json(habit)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        const habit = await Habit.findById(parseInt(req.params.id))
        const updatedHabit = await habit.update(req.body.name, req.body.desc, req.body.freq, req.body.start_date, req.body.last_completed, req.body.streak, req.body.id)
        res.json(updatedHabit)
    } catch(err){
        res.status(500).json({err})
    }
}

const destroy = async (req, res) => {
    try {
        // get the cat first by id then destroy
        const habit = await Habit.findById(parseInt(req.params.id))
        await habit.destroy()
        res.status(204).json('Habit deleted')
    } catch(err){
        res.status(500).json({err})
    }
}

module.exports = { displayAll, getHabit, create, update, destroy }