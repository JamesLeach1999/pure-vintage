const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose")

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: 'That email is not registered'
                    });
                }

                // console.log(user.isAdmin)
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user, {isAdmin: false, id: user._id});
                    } else if (user.isAdmin){
                        // setting the necessary authentication data
                        console.log(user.isAdmin && isMatch)
                        return done(null, user, {isAdmin: true, id: user._id})
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect'
                        });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            
            done(err, user, {id: id});
        });
    });
};