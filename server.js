const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const authRoute = require("./src/routers/user");
const postRoute = require("./src/routers/product")
const expressLayouts = require("express-ejs-layouts")

const path = require("path")
const session = require("express-session")
const passport = require("passport")
const bodyParser = require("body-parser")

dotenv.config()
require("./src/middleware/passport")(passport)


mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("connected to db")
})



// makes post requests from http available to req.body

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ejs
app.use(expressLayouts)
app.set("view engine", "ejs")

// body parser, to get form data

app.use(bodyParser.urlencoded({extended: true}))

// express session, nthese are just for messages, saved in the session i guess

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: null}
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


//   connect flash


// // global vars

// route middlewares
// so everything in the auth route will have this prefix


app.use("/", authRoute)
app.use("/", postRoute)
app.use(express.static("views"));

app.listen(3000, () => {
  console.log("server run successfully");
});