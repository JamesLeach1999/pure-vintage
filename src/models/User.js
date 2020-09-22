  const mongoose = require('mongoose');
  const _ = require('lodash');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');
  const validator = require("validator");
  const bcrypt = require('bcryptjs');

  const jwtSecret = "123455667";



  const UserSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true,
          // removes spaces
          trim: true
      },
      email: {
          // this guaruntees uniqueness for the db. only catch is we have to wipe the db
          type: String,
          unique: true,
          required: true,
          trim: true,
          lowercase: true,
          validate(value) {
              // uses the validator module then the isEmail method, checking the email value stored in value
              // value is always the field (column) itself
              // like keypair array, but the pair or value goes through validation before adding
              if (!validator.isEmail(value)) {
                  throw new Error("things are not valid")
              }
          }
      },

      password: {
          type: String,
          required: true,
          trim: true,
          // minLength: 8 works too
          // goes through the first bit of validation then value has already been partially validated 
          validate(value) {
              if (value.length < 8) {
                  // if password too short or equals password, throw error
                  throw new Error("password too short")
                  // can use value.includes() can pass in multiple invalid passwords
              } else if (value === "password") {
                  throw new Error("pick a better password")
              }
          }
      },

      isAdmin: {
          type: Boolean,
          default: false
      },
      // required to add new item onto tokens array. stores the token of every login request made
      tokens: [{
          token: {
              type: String,
              required: true
          }
      }]
      // store the data as binary 

      // timestamps: true

  })


  // UserSchema.methods.toJSON = function () {
  //     const user = this;
  //     const userObject = user.toObject();

  //     // return the document except the password and sessions (these shouldn't be made available)
  //     return _.omit(userObject, ['password', 'sessions']);
  // }

  UserSchema.methods.generateAuthToken = async function () {
      const user = this;
      const token = jwt.sign({
          _id: user._id
      }, process.env.JWT_SECRET)

      user.tokens = user.tokens.concat({
          token: token
      })

      await user.save()

      return token
  }

  // UserSchema.methods.generateRefreshAuthToken = function () {
  //     // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
  //     return new Promise((resolve, reject) => {
  //         crypto.randomBytes(64, (err, buf) => {
  //             if (!err) {
  //                 // no error
  //                 let token = buf.toString('hex');

  //                 return resolve(token);
  //             }
  //         })
  //     })
  // }

  // UserSchema.methods.createSession = function () {
  //     let user = this;

  //     return user.generateRefreshAuthToken().then((refreshToken) => {
  //         return saveSessionToDatabase(user, refreshToken);
  //     }).then((refreshToken) => {
  //         // saved to database successfully
  //         // now return the refresh token
  //         return refreshToken;
  //     }).catch((e) => {
  //         console.log(e)
  //         return Promise.reject('Failed to save session to database.\n' + e);
  //     })
  // }



  /* MODEL METHODS (static methods) */

  // UserSchema.statics.getJWTSecret = () => {
  //     return jwtSecret;
  // }



  // UserSchema.statics.findByIdAndToken = function (_id, token) {
  //     // finds user by id and token
  //     // used in auth middleware (verifySession)

  //     const User = this;

  //     return User.findOne({
  //         _id,
  //         'sessions.token': token
  //     });
  // }


  // UserSchema.statics.findByCredentials = function (email, password) {
  //     let User = this;
  //     return User.findOne({ email }).then((user) => {
  //         if (!user) return Promise.reject();

  //         return new Promise((resolve, reject) => {
  //             bcrypt.compare(password, user.password, (err, res) => {
  //                 if (res) {
  //                     resolve(user);
  //                 }
  //                 else {
  //                     reject();
  //                 }
  //             })
  //         })
  //     })
  // }

  // UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  //     let secondsSinceEpoch = Date.now() / 1000;
  //     if (expiresAt > secondsSinceEpoch) {
  //         // hasn't expired
  //         return false;
  //     } else {
  //         // has expired
  //         return true;
  //     }
  // }


  // /* MIDDLEWARE */
  // // Before a user document is saved, this code runs
  // UserSchema.pre('save', function (next) {
  //     let user = this;
  //     let costFactor = 10;

  //     if (user.isModified('password')) {
  //         // if the password field has been edited/changed then run this code.

  //         // Generate salt and hash password
  //         bcrypt.genSalt(costFactor, (err, salt) => {
  //             bcrypt.hash(user.password, salt, (err, hash) => {
  //                 user.password = hash;
  //                 next();
  //             })
  //         })
  //     } else {
  //         next();
  //     }
  // });


  // /* HELPER METHODS */
  // let saveSessionToDatabase = (user, refreshToken) => {
  //     // Save session to database
  //     return new Promise((resolve, reject) => {
  //         let expiresAt = generateRefreshTokenExpiryTime();

  //         user.sessions.push({ 'token': refreshToken, expiresAt });

  //         user.save().then(() => {
  //             // saved session successfully
  //             return resolve(refreshToken);
  //         }).catch((e) => {
  //             reject(e);
  //         });
  //     })
  // }

  // let generateRefreshTokenExpiryTime = () => {
  //     let daysUntilExpire = "10";
  //     let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
  //     return ((Date.now() / 1000) + secondsUntilExpire);
  // }

  module.exports = mongoose.model("User", UserSchema)