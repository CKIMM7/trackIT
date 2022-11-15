const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());

const userRoutes = require('./routes/users');
const habitRoutes = require('./routes/habits');
const clientRoutes = require('./routes/clients');

server.use('/users', userRoutes)
server.use('/habits', habitRoutes)
server.use('/', clientRoutes)

const auth = require('./controller/users');

//***D:\portfolios\trackIT\client <-should be looking at this
//assets should just point at index.html, ../ or ./ does not have an effect
server.use('/', express.static(path.join(__dirname, '../client')))



let reqPath = path.join(__dirname, '../client');
console.log(reqPath);

//server.get('/', auth.authorization ,(req, res) => 
    //res.sendFile(path.join(__dirname, '../client/html.html')))

server.get('/login', (req, res) => 
    res.sendFile(path.join(__dirname, '../client/login.html')))

server.get('/signup', (req, res) => 
    res.sendFile(path.join(__dirname, '../client/pages/signup.html')))

server.get('/admin', (req, res) => 
    res.send({ id: req.id, email: req.email }))




//server.get('/', (req, res) => res.send('Hello world! 0.2'))

module.exports = server
