const Users = require('../models/User');

const displayAll = async (req, res) => {
    try {
        const authors = await Users.all;
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { displayAll }