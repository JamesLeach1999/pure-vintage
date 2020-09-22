// this is here without listen because
// this is where we get access to our express application and export it so our test suite can load it in
// index can also load it in to eventually call listen
// since we dont want duplicate files, we just load in express in app and call listen here. 
// good to keep seperate so testing can be done on app independantely 
const express = require("express")
const path = require("path")
require("./db/mongoose")
const ejs = require("ejs")
// just importing user frm the other file
const userRouter = require("../src/routers/user")
const taskRouter = require("../src/routers/task")

// remove port since we dont use listen
// well we do but we define it in index
const app = express()

const pubDirPath = path.join(__dirname, "../views")

// express.static for serving up static pages like html. anything else like hbs is render
app.use(express.static(pubDirPath))
// app.engine('html', require('hbs').__express);


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



module.exports = app

// process.env gives access to env variables
// need to use a node module to access from all project also cross os