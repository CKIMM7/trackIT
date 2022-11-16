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
        res.sendFile(path.join(__dirname, '../../client/assets/pages/newlogin.html'))
        
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
        res.sendFile(path.join(__dirname, '../../client/assets/pages/signup.html'))
        
        } catch (err) {
        res.send(err)
        }
}

const testPage = async (req, res) => {

    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
}

module.exports = { landingPage, loginPage, signUpPage, testPage }
