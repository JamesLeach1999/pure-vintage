const jwt = require("jsonwebtoken")

// middleware function to add to routes you wanna protect

// ensure authentication
// this is your middleware
module.exports = {
    ensureAuthenticated: function (req, res, next) {

        // passport gives us the ensure authenticated method
        if(req.sessionID){
            console.log(req.body)
            req.session.isAdmin = false
            return next()
        }

        res.redirect("/login")
    },

    ensureAdmin: function (req, res, next) {
        // passport gives us the ensure authenticated method
        if(req.sessionID){
            req.session.isAdmin = true
            req.session.isUser = true
            // console.log(req.session)
            return next()
        }

        res.send("log in as admin")
    }
}
