const jwt = require("jsonwebtoken")
const User = require("../models/User")

// middleware function to add to routes you wanna protect

// ensure authentication
// this is your middleware
module.exports = {
    ensureAuthenticated: function  (req, res, next)  {

        if(req.isAuthenticated()){
            console.log("auth")
            return next()
        } 
            console.log("error")
            res.redirect("/home")
        
    },
    
    // // passport gives us the ensure authenticated method
    // // console.log(req.session)
    // if(req.isAuthenticated()){
    //     const id = req.session.passport.user
    //     User.findById({_id: id}).exec().then(user => {
    //         console.log(user)
    //         return next(user)
    //     })

    //     // if(userExist){
    //     //     console.log(userExist)
    //     //     req.session.isAdmin = false
    //     //     req.session.isAuth = true
    //     // }
    // }

    // res.redirect("/home")
    // ensureAdmin: function (req, res, next) {
    //     // passport gives us the ensure authenticated method
    //     console.log(req.session)
    //     if(req.isAuthenticated()){
    //         const id = req.session.passport.user
    //         const userExist = await User.findById({_id: id}, async (err, res) => {
    //             console.log(res)
    //         })

    //         if(userExist){
    //             req.session.isAdmin = false
    //             req.session.isAuth = true
    //             return next()
    //         }
    //     }

    //     res.send("log in as admin")
    // }
}
