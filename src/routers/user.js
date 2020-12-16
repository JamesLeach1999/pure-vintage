const express = require('express');
const User = require('../models/User');
// const Product = require("../models/Products")
const { ensureAuthenticated } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { sendWelcome, sendCancel } = require('../emails/account');
const ls = require('local-storage');

const router = new express.Router();

// so this means /api/user/register

router.post('/register', (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // check for errors required fields

  if (!name || !email || !password) {
    errors.push({
      msg: 'please fill all fields',
    });
  }

  // check pass length

  if (password.length < 6) {
    errors.push({
      msg: 'password too short',
    });
  }
  // we dont want the form to completely clear this is where those ejs values come in, wont actually show error

  // encrypt passwords if validation passes
  // returns promise
  // the tutorial i was following along with for some reason put the success case in the catch statement
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (user.email) {
        errors.push({
          msg: 'email in use',
        });
      }

      if (errors.length > 0) {
        res.send({
          errors,
        });
      }
    })
    .catch((error) => {
      const newUser = new User({
        name,
        email,
        password,
      });
      // hashing password and sending the welcome email using sendgrid
      console.log(newUser + '1');
      sendWelcome(req.body.email, req.body.name);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // set password to hashed
          newUser.password = hash;

          console.log(hash);
          newUser
            .save()
            .then((user) => {
              console.log(user)
              passport.authenticate('local', (err, user, info) => {
                console.log(user);
                console.log("numberwang")
                if (err) throw err;
                if (!user) res.send('no user');
                else {
                  req.logIn(user, (err) => {
                    if (err) throw err;
                    res.send(req.session);
                    console.log(req.session);
                  });
                }
              })(req, res, next);
            })
            .catch((err) => {
              console.log(err)
        res.send(req.session);
            });
        });
      });
    });
});

// rendering the sign up page
router.get('/signup', async (req, res) => {
  res.render('signup.ejs', {
    isAuth: false,
    isAdmin: false,
  });
});

router.get('/getAuth', async (req, res) => {
  const auth = await User.findById({ _id: req.query.id });

  res.send({
    isAuth: true,
    isAdmin: auth.isAdmin,
    id: auth._id,
  });
});

// get own profile
// router.get("/me", ensureAuthenticated, async (req, res) => {
//     // retrieving id data set in passport line 32
//     const id = req.session.passport.user

//     const userProfile = await User.findById({
//         _id: id
//     })

// // console.log(userProfile)
// res.send( {
//     userProfile: userProfile,
//     isAuth: true,
//     isAdmin: userProfile.isAdmin
// })

// })

router.get('/about', async (req, res) => {
  res.render('about.ejs', {
    isAuth: false,
    isAdmin: false,
  });
});

// router.get('/me', async (req, res) => {
//   console.log("number")
//   console.log(req.query.id);
//   const user = await User.findById({ _id: req.query.id });

//   console.log(user);
//   if (!user) {
//     throw new Error();
//   }

//   res.send({
//     userProfile: user,
//     isAuth: true,
//     isAdmin: user.isAdmin,
//   });
// });

// rendering login page
// router.get("/login", async (req, res) => {
//     // retrieving id data set in passport line 32
//     res.render("login.ejs")
// })

// login function, using passport built in methods for better security
router.post('/login', (req, res, next) => {
  console.log(req.session);
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err) throw err;
    if (!user) res.send('no user');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.session);
        console.log(req.session);
      });
    }
  })(req, res, next);
});

// ?logout session
router.get('/logout', (req, res) => {
  // logout is a passport function
  req.logout();
  res.redirect('/store');
});



module.exports = router;
