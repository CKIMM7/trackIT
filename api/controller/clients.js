const path = require('path');

const landingPage = async (req, res) => {

    console.log(path.join(__dirname, '../../client/index.html'))
    try {
        // const user = { cookie: req.cookies.access_token,
        //                    id: req.id,
        //                 email: req.email }
        console.log(path.join(`${__dirname}/index.html`))
        res.sendFile(path.join(__dirname, '../../client/index.html'))
        
        } catch (err) {
        res.send(err)
        }
}

module.exports = { landingPage }
