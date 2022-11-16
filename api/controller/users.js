const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const server = require('../server');

const currentUser = async (req, res) => {
    console.log(req.cookies.access_token);
    try {
    
    const user = { cookie: req.cookies.access_token,
                       id: req.id,
                    email: req.email }
        req.send(user)
    } catch (err) {
        res.send(err)
    }
}

const displayAll = async (req, res) => {
    console.log(req.cookies.access_token);
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
        console.log(err)
        res.status(404).json({err})
    }
}

const getHabits = async (req, res) => {
    try {
        const user = await Users.getHabits(parseInt(req.params.id))
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
        console.log(req.body)
        const user = await Users.getUser(parseInt(req.body.id))
        const updatedUser = await user.update(req.body)
        console.log(`user ${user} updatedUser ${updatedUser}`)
        res.status(200).json(updatedUser)
    } catch(err){
        console.log(err)
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
        console.log('token')
        console.log(user)

        // const data = await jwt.verify(user, "some_secret")
        //     console.log('jws:data')
        //     console.log(data)
    res
    .cookie("access_token", user, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌",
            user: user });

    } catch(err) {
        console.log(err)
        res.status(404).json('error')
    }
}

const authorization = async (req, res, next) => {

    const token = req.cookies.access_token;
    console.log(`token`);
    console.log(token);
    //if no token, send a 403 msg
    if (!token) {
        return res.redirect('https://trackit-sillicon-alley.netlify.app/');
    }

    try {
        console.log(`verify token if it works move onto the next`)
        const data = await jwt.verify(token, "some_secret");
        //if wrong token then return the user back to homepage
        console.log('jws:data')
        console.log(data)

        // const habits = await User.getHabits(data.id)
        // console.log(habits)

        req.id = data.id;
        req.email = data.email;

        // if(req.originalUrl.split()[1] == 'habit') req.habit = req.originalUrl.split('/')[2]
        // console.log(req.originalUrl.split('/')[2])

    return next();
    
    } catch {
        console.log('auth')
        return res.redirect('http://localhost:3000/login');
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

const checkPassword = async (req, res) => {
    try {
        console.log(req.body)
        const user = await Users.getUser(req.body.id)
        console.log('user: '+user)
        const test = await user.passwordCheck(req.body.oldPass)
        console.log('test: '+test)
        // update if true
        if(test){
            const updated = await user.update(req.body.id, req.body.newPass)
            console.log(updated)
            console.log('password updated')
            res.status(200).json(updated)
            // res.status(20).json(test)
        }
        // res.status(200).json(test)
        
    } catch(err){
        res.status(500).json({err})
    }
}

module.exports = { displayAll, getUser, getHabits, create, update, destroy, login, checkPassword, signup, authorization, currentUser }
