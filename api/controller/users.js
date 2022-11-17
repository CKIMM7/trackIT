const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        const users = await User.all;
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
        const users = await User.create(req.body.name, req.body.email, req.body.password)
        res.status(201).json(users)
    } catch(err) {
        res.status(404).json({err})
    }
}

const update = async (req, res) => {
    try {
        console.log('c.users.update: '+req.body)
        const user = await User.getUser(parseInt(req.body.id))
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
        const user = await User.findById(parseInt(req.params.id))
        await user.destroy()
        res.status(204).json('User deleted')
    } catch(err){
        res.status(500).json({err})
    }
}

const login = async (req, res) => {
    //console.log(req.body)
    try {
        const user = await User.login(req.body.email, req.body.password)
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

    console.log(req.body.token)

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
        req.global = data

        // if(req.originalUrl.split()[1] == 'habit') req.habit = req.originalUrl.split('/')[2]
        // console.log(req.originalUrl.split('/')[2])

    return next();
    
    } catch {
        console.log('auth')
        return res.redirect('http://localhost:3000/login');
    }
  };

  const returnGlobal = async (req, res) => {
    console.log(req.global)

    try {
        res.status(200).json(req.global);
    } catch(err){
        res.status(500).json({err})
    }
}

const signup = async (req, res) => {

    try {
        let userExists = true;
        const findUser = await User.findByEmail(req.body.email)
        .then(data => { 
            console.log(data)
        })
        .catch(err => {
            console.log(err)
            console.log('creaing new user')
            userExists = false
        })

        if(!userExists) {
            const newUser = await User.signup(
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
        console.log('--controller')
        console.log('c.users.body.id: '+req.body.id)
        const user = await User.getUser(req.body.id)
        console.log('user id: '+user.id)
        const test = await user.passwordCheck(req.body.oldPass)
        
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(req.body.newPass, salt)

        const data = {
            id: req.body.id, 
            name: user.name,
            email: user.email,
            password: hashed
        }

        console.log('returns test: '+test)
        // update if true
        if(test){
            console.log('user_id: '+req.body.id)
            const updated = await user.update(data)
            console.log('updated: ')
            console.log(updated)
            console.log('password updated')
            res.status(200).json(updated)
        }
        
    } catch(err){
        console.log(err)
        res.status(500).json({err})
    }
}

module.exports = { displayAll, getUser, getHabits, create, update, destroy, login, checkPassword, signup, authorization, currentUser, returnGlobal }
