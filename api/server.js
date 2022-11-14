const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users')
const userRoutes = require('./routes/habits')
server.use('/users', userRoutes)
server.use('/habits', habitRoutes)

server.get('/', (req, res) => res.send('Hello world!'))

module.exports = server
