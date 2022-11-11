const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users')
server.use('/users', userRoutes)

server.get('/', (req, res) => res.send('Hello world!'))

module.exports = server