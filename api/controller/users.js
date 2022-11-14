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
        const user = await Users.getUser(parseInt(req.params.id))
        res.status(200).json(user)
    } catch(err){
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
        console.log(err)
        res.status(404).json('error')
    }
}

const signup = async (req, res) => {

    try {
        let userExists = true;
        const findUser = await Users.findByEmail(req.body.email)
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            console.log('creaing new user')
            userExists = false
        })

        if(!userExists) {
            const signUp = await Users.signup(
                req.body.name,
                req.body.password,
                req.body.email)
        }

    } catch(err) {
        res.status(404).json({err})
    }
}

const editInfo = async (req, res) => {
    try {

    } catch(err){
        
    }
}

module.exports = { displayAll, getUser, create, update, destroy, login, signup }
