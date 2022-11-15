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

        // res.status(200).json(user)
    res
    .cookie("access_token", user, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });

    } catch(err) {
        console.log(err)
        res.status(404).json('error')
    }
}

const authorization = async (req, res, next) => {

    const token = req.cookies.access_token;
    console.log(token);
    //if no token, send a 403 msg
    if (!token) {
      return res.sendStatus(403);
    }

    try {
    console.log(`verify token if it works move onto the next`)
    const data = jwt.verify(token, "some_secret");
    console.log(data)
    req.userId = data.id;
    req.userRole = data.role;
    return next();
    
    } catch {
        return res.sendStatus(403);
    }
  };

const signup = async (req, res) => {

    try {
        let userExists = true;
        const findUser = await Users.findByEmail(req.body.email)
        .then(data => { 
            console.log(data)
        })
        .catch(err => {
            console.log(err)
            console.log('creaing new user')
            userExists = false
        })

        if(!userExists) {
            const newUser = await Users.signup(
                req.body.name,
                req.body.password,
                req.body.email)

        res.status(200).json(newUser);
        }

        res.status(200).json(findUser);
        
    } catch(err) {
        res.status(404).json({err})
    }
}

const editInfo = async (req, res) => {
    try {

    } catch(err){
        
    }
}

module.exports = { displayAll, getUser, getHabits, create, update, destroy, login, signup, authorization }
