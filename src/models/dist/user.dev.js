"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

mongoose.connect(process.env.CONN_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // removes spaces
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("things are not valid");
      }
    }
  },
  isAdmin: {
    type: Boolean,
    required: false,
    "default": false
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // goes through the first bit of validation then value has already been partially validated 
    validate: function validate(value) {
      if (value.length < 8) {
        // if password too short or equals password, throw error
        throw new Error("password too short"); // can use value.includes() can pass in multiple invalid passwords
      } else if (value === "password") {
        throw new Error("pick a better password");
      }
    }
  },
  // required to add new item onto tokens array. stores the token of every login request made
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
userSchema.virtual("Products", {
  ref: "Product",
  localField: "_id",
  foreignField: "name"
});

userSchema.methods.toJSON = function _callee() {
  var user, userObject;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          userObject = user.toObject();
          return _context.abrupt("return", userObject);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.methods.generateAuthToken = function _callee2() {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, process.env.SECRET);
          user.tokens = user.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee3(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.find({
            email: email
          }));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          console.log("nijfjvbei");
          throw new Error("unable to login");

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user[0].password));

        case 8:
          isMatch = _context3.sent;

          if (isMatch) {
            _context3.next = 11;
            break;
          }

          throw new Error("unable to login");

        case 11:
          return _context3.abrupt("return", user);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};

userSchema.pre("save", function _callee4(next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = this;

          if (!user.isModified("password")) {
            _context4.next = 5;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context4.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
});
var User = mongoose.model("User", userSchema);
module.exports = User;