const path = require('path');

const landingPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/index.html'))
    try {

        console.log(path.join(`${__dirname}/index.html`))
        res.sendFile(path.join(__dirname, '../../client/index.html'))
        
        } catch (err) {
        res.send(err)
        }
}

const loginPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/login.html'))
    try {
        // const user = { cookie: req.cookies.access_token,
        //                    id: req.id,
        //                 email: req.email }
        console.log(path.join(`${__dirname}/index.html`))
        res.sendFile(path.join(__dirname, '../../client/login.html'))
        
        } catch (err) {
        res.send(err)
        }
}

const signUpPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/login.html'))
    try {
        // const user = { cookie: req.cookies.access_token,
        //                    id: req.id,
        //                 email: req.email }
        console.log(path.join(`${__dirname}/index.html`))
        res.sendFile(path.join(__dirname, '../../client/pages/signup.html'))
        
        } catch (err) {
        res.send(err)
        }
}

module.exports = { landingPage, loginPage, signUpPage }
