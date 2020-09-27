const express = require('express')
const User = require('../models/User')
const Product = require("../models/Products")
const {ensureAuthenticated} = require("../middleware/auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")


const router = new express.Router()


// so this means /api/user/register

router.post("/register", (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body
    let errors = []

    // check for errors required fields

    if (!name || !email || !password) {
        errors.push({
            msg: "please fill all fields"
        })
    }

    

    // check pass length

    if (password.length < 6) {
        errors.push({
            msg: "password too short"
        })
    }
    // we dont want the form to completely clear this is where those ejs values come in, wont actually show error
    
        // encrypt passwords if validation passes
        // returns promise
        User.findOne({
            email: email
        }).then(user => {
            if (user.email) {
                errors.push({
                    msg: "email in use"
                })
            }

            if (errors.length >0) {
                res.render("signup.ejs", {
                    errors
                })
            }
            
        }).catch((error) => {
            const newUser = new User({
                name,
                email,
                password
            })
            // hash
            console.log(newUser + "1")
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    // set password to hashed
                    newUser.password = hash

                    console.log(hash)
                    newUser.save().then(user => {


                        // calling middleware
                        console.log(user)
                        // req.flash("success_msg", "registered")
                        res.redirect("/home")
                    }).catch((err) => {
                        res.redirect("login")
                    })
                })
            })
        })

    
})

// get own profile
router.get("/me", ensureAuthenticated, async (req, res) => {
    // retrieving id data set in passport line 32
    const id = req.session.passport.user

    if(id){
        const userProfile = await User.findById({_id : id})
        
        res.render("user.ejs", {
            userProfile: userProfile
        })
    }
})

// login function
router.post('/login', (req, res, next) => {

    // req.session.id = req.user._id

    passport.authenticate('local', {
      successRedirect: '/store',
      failureRedirect: '/home'
    })(req, res, next);
  });


// ?logout session
router.get("/logout", (req, res) => {
    // logout is a passort function
    req.logout()
    res.redirect("/login")
})

router.get('/createadmin', async (req, res) => {
    try {
      const user = new User({
        name: 'jim',
        email: 'a@a.com',
        password: 'jimmyb0B',
        isAdmin: true,
      });
      const newUser = await user.save();
      res.send(newUser);
    } catch (error) {
      res.send(error);
    }
  });


module.exports = router

