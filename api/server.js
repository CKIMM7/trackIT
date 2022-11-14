const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users')
const habitRoutes = require('./routes/habits')
server.use('/users', userRoutes)
server.use('/habits', habitRoutes)

server.get('/', (req, res) => res.send('Hello world! 0.2'))

module.exports = server
