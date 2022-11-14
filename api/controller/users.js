const Users = require('../models/User');

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
        const user = await User.user()
        res.json()
    } catch(err){
        res.status(404).json({err})
    }
}

const create = async (req, res) => {
    try {
        const users = await Users.create(req.body.email, req.body.password)
        res.json(users)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        const user = await Users.findById(parseInt(req.params.id))
        const updatedUser = await user.update(req.body.name)
    } catch(err){
        res.status(500).json({err})
    }
}

const destroy = async (req, res) => {
    try {
        // get the cat first by id then destroy
        const user = await Users.findById(parseInt(req.params.id))
        await user.destroy()
        res.status(204).json('User deleted')
    } catch(err){
        res.status(500).json({err})
    }
}

const login = async (req, res) => {
    try {

    } catch(err){

    }
}

const signup = async (req, res) => {
    try {

    } catch(err){
        
    }
}

const editInfo = async (req, res) => {
    try {

    } catch(err){
        
    }
}

module.exports = { displayAll, getUser, create, update, destroy }