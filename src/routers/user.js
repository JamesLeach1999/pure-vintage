const express = require('express')
const User = require('../models/User')
const Product = require("../models/products")
const router = new express.Router()
const auth = require('../middleware/auth')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
    registerValidation,
    loginValidation
} = require("../validation/validation")



// so this means /api/user/register
router.post("/register", async (req, res) => {

    // validating data before making user
    // returns an error object 
    const {
        error
    } = registerValidation(req.body)
    // cos its the first value in the array, returns error if there is no result
    if (error) {
        // kill the function with return
        return res.status(400).send(error.details[0].message)
    }

    // checking if user already in db
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if (emailExists) {
        return res.status(400).send("email already exists")
    }

    // hashing assword
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    // save user
    try {
        // dont send back password
        const savedUser = await user.save()
        const products = await Product.find({})

        // console.log(user)
        res.render("signup.ejs", {
            user: user._id,
            name: "welcome " + user.name,
            names: products,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// login function
router.post("/login", async (req, res) => {

    const {
        error
    } = loginValidation(req.body)
    // cos its the first value in the array, returns error if there is no error
    if (error) {
        // kill the function with return
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findOne({
        email: req.body.email
    })
    // get the while user back
    if (!user) {
        return res.status(400).send("email dosent exist, or password wrong")
    }
    // check if password correct
    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(400).send("email or password wrong")
    }

    // adding jwt
    // in the frontend you pass in this id to know your user is logged in
    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET)

    await user.generateAuthToken()
    const products = await Product.find({})
console.log(token)
    res.header("authToken", token).send(token).render("login.ejs", {
      user: user._id,
      token: token,
      name: "welcome back " + user.name,
      names: products,
      isAdmin: user.isAdmin
  })
    // cant be changed by user as the token wont be valid anymore

})

router.get("/tasks/:id", auth, async (req, res) => {

  const _id = req.params.id;

  try {
      // find a task by its id and find out whose it is. _id is the task, owner is the id of the owner
      const task = await Task.findOne({
          _id: _id, owner: req.user._id
      })
      if(!task){
          return res.status(404).send()
      }
          res.status(201).send(task)

  } catch (error) {
      res.status(500).send(error)
      
  }
})


router.get('/users/me', auth, async (req,res) => {
  const user = req.user
  res.send(user) //reg.user created @auth step
  })

module.exports = router



//   router.post("/users/login", async (req, res) => {
//     // using a function on User weve made. takes email and password. have to make in schema first
//     try {
//         // have to make in models as it is a method directly on the model
//         // // we use non upper case for token, as we are interacting with just one user
//         // const token = await user.generateAuthToken()
//         const user = await User.findByCredentials(req.body.email, req.body.password)

//         // use small user as User is the model itself, user is the data
//         // right so this is currently broken
//         try {
//             const token = await user.generateAuthToken()
//         //     const token = await user.generateAuthToken(req.body.email, req.body.password)
//         } catch (error) {
//             console.log(error)
//         }

//         const validUser = await user.toJSON()
// // returns error message if no work and the user document if it works
//         res.send({validUser}) // remember you send back the data with an object
//     } catch (error) {
//         res.status(400).send()
//     }
// })

// // LOGOUT FUNCTION 
// // need token which was used whentey authenticated, so go into auth and vchange 
// router.post("/users/logout", auth, async (req, res) => {
//     try {
//         // access ind tokens with filter. return true when it is not thetoken, so removes when it is false. actually not sure
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.user.save()

//         res.send()
//     } catch (error) {
//         res.status(500).send({e: error})
//     }
// })

// // CHALLENGE
// // this logs out all users on all devices. wipes out all the tokens
// router.post("/users/logoutAll", auth, async (req, res) => {
//     try {
//         // access ind tokens with filter. return true when it is not thetoken, so removes when it is false. actually not sure
//         req.user.tokens = []
//         req.user.password = ""

//         await req.user.save()

//         res.send()
//     } catch (error) {
//         res.status(500).send()
//     }
// })


  
//   //create new user
//   router.post("/users", async (req, res) => {
//     const user = new User(req.body)
//     console.log(user)
//     try {
//         await user.save()
//         // makes new token, even if the same every time someone makes a post request to users
        
//         const token = await user.generateAuthToken()
        
//         res.status(201).send({user, token})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
  
//   router.patch('/users/me', auth, async(req, res) =>{
//     const validUpdates = ['name', 'email', 'password', 'age']
//     const updates = Object.keys(req.body)
//     const isValidUpdate = updates.every((update)=>{
//       return validUpdates.includes(update)
//     })
//     if(!isValidUpdate){
//       return res.status(400).send({error: "invalid update !  "})
//     }
  
//     try {
      
//       const user = req.user
//       updates.forEach((update) => {
//         user[update] = req.body[update]
//       })

//       await user.save()
      
  
//       res.send(user)
//     } catch (error) {
//       res.status(400).send(error)
      
//     }
  
//   })
  

// router.delete('/users/me', auth, async(req, res) => {
//     try {
//       await req.user.remove()
//       res.send(req.user)
//     } catch (error)  {
//       res.status(500).send()
//     }
//   })
  
  
// module.exports = router