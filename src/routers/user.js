const express = require('express');
const User = require('../models/User');
=
const Product = require('../models/products');
const { ensureAuthenticated } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { sendWelcome } = require('../emails/account');


const router = new express.Router();

// next needed for passport
router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;

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

      throw new Error('email used');
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
              console.log(user);
              // auth on register. so when registered no need for login
              passport.authenticate('local', (err, user, info) => {
                console.log('numberwang');
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
              console.log(err);
              res.send(err);
            });
        });
      });
    });
});
// a cheeky route telling us whether or not the user is auth and if they are admin
// whilst the id is stored on the client, the information sent to the brwser is dependant on this
// this sends back auth and isAdmin, so fo the moment using it as a bodge job authentication
router.post('/getAuth', async (req, res) => {
  try {
    const auth = await User.findById({ _id: req.body.id });

    res.send({
      isAuth: true,
      isAdmin: auth.isAdmin,
      id: auth._id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      isAuth: false,
      isAdmin: false,
      error,
    });
  }
});

router.get('/about', async (req, res) => {
  res.render('about.ejs', {
    isAuth: false,
    isAdmin: false,
  });
});

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
