const jwt = require("jsonwebtoken")

// middleware function to add to routes you wanna protect

module.exports = function (req, res, next) {
    // get the auth token has to be same as what you set the auth name as
    const token = req.header("authToken")
    // if it dosent exist then send back a error
    if (!token) {
        return res.status(401).send("no token")
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(verified)
        req.user = verified
        // console.log(verified)
        // sends back id
        next()
    } catch (error) {
        res.status(400).send("invalid token")
    }
}