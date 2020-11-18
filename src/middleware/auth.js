const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware function to add to routes you wanna protect

// ensure authentication
// this is your middleware
module.exports = {
  // using passport functions make this process alot easier
  ensureAuthenticated: async function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('auth');
      return next();
    }

    throw new Error()
  },

  loadPage: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
  },
};
