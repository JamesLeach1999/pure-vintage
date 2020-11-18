const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const authRoute = require("./src/routers/user");
const postRoute = require("./src/routers/product")
const orderRoute = require("./src/routers/order")
const expressLayouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const cors = require("cors")

// using dotenv to get environment variables
dotenv.config()
// app.use(cors())

require("./src/middleware/passport")(passport)

app.use(
  cors({
    origin: 'http://localhost:3000',
    // allowedHeaders: "Access-Control-Allow-Origin", // <-- location of the react app were connecting to
    credentials: true
  })
);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}, () => {
  console.log("connected to db")
})



// makes post requests from http available to req.body

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// // ejs
// app.use(expressLayouts)
// app.set("view engine", "ejs")

// body parser, to get form data

app.use(bodyParser.urlencoded({extended: true}))

// express session, nthese are just for messages, saved in the session i guess

app.use(session({
    secret: process.env.EXPRESS_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 20000000000}
}))


// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser(process.env.EXPRESS_SESSION));

// route middlewares
// so everything in the auth route will have this prefix
const PORT = process.env.PORT || 5000
app.use("/", authRoute)
app.use("/", postRoute)
app.use("/", orderRoute)

app.use(express.static("work/src"));

if(process.env.NODE_ENV === "production"){
  app.use(express.static("work/build"))
}

app.listen(PORT, () => {
  console.log("server run successfully");
});