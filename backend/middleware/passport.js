const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
// to compare the hash
const bcrypt = require("bcryptjs")

// load user model
const User = require("../models/User")

// we're going to pass in passport from app.js
module.exports = function (passport) {
    passport.use(
        // using email as the username
        // done is like next
        new LocalStrategy({
            usernameField: "email"
        }, (email, password, done) => {
            // check if there is a user with the email. match user
            User.findOne({
                email: email
            }).then((user) => {
                // will either give us the user or null
                if (!user) {
                    // null is the error, then user and options
                    return done(null, false, {
                        message: "email not registered"
                    })
                }
                // if it is here then keep going

                // match the password
                // user.password is from the db
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    // if this is true then its assed
                    if (isMatch) {
                        // null just means no error
                        return done(null, user)
                    } else {
                        return done(null, false, {
                            message: "password incorrect"
                        })
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
        })
    )

    // serialising the user and deserialing, still in the exports
    // sessions are established but maintained in the users browser. will not contain credentials but rather the unique cookie

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })
    // return user with new id, then check the id
    passport.deserializeUser(function (id, done) {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })


}