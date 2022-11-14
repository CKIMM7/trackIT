const User = require('../models/User');

const displayAll = async (req, res) => {
    try {
        const users = await Users.all;
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.getUser(parseInt(req.params.id))
        res.status(200).json(user)
    } catch(err){
        console.log(err)
        res.status(404).json({err})
    }
}

const getHabits = async (req, res) => {
    try {
        const user = await User.getHabits(parseInt(req.params.id))
        res.status(200).json(user)
    } catch(err){
        console.log(err)
        res.status(404).json({err})
    }
}

const create = async (req, res) => {
    try {
        const users = await Users.create(req.body.name, req.body.email, req.body.password)
        res.status(201).json(users)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        const user = await Users.findById(parseInt(req.params.id))
        const updatedUser = await user.update(req.body.id, req.body.name)
        res.status(200).json(updatedUser)
    } catch(err){
        res.status(500).json({err})
    }
}

const destroy = async (req, res) => {
    try {
        const user = await Users.findById(parseInt(req.params.id))
        await user.destroy()
        res.status(204).json('User deleted')
    } catch(err){
        res.status(500).json({err})
    }
}

const login = async (req, res) => {
    //console.log(req.body)
    try {
        const user = await Users.login(req.body.email, req.body.password)
        res.status(200).json(user)
    } catch(err) {
        res.status(404).json({err})
    }
}

const signup = async (req, res) => {
    //console.log(req.body)
    try {
        const user = await Users.signup(req.body.name, req.body.password, req.body.email)
        res.status(201).json(user)
    } catch(err) {
        res.status(404).json({err})
    }
}

const editInfo = async (req, res) => {
    try {

    } catch(err){
        
    }
}

module.exports = { displayAll, getUser, getHabits, create, update, destroy, login, signup }
