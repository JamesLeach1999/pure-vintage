const jwt = require("jsonwebtoken")
const User = require("../models/User")

// middleware function to add to routes you wanna protect

// ensure authentication
// this is your middleware
module.exports = {
    // using passport functions make this process alot easier
    ensureAuthenticated: function  (req, res, next)  {
        if(req.isAuthenticated()){
            console.log("auth")
            return next()
        } 
            console.log("error")
            res.redirect("back")
        
    },

    loadPage: function (req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
    }
    
}
