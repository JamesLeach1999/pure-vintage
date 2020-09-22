const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const authRoute = require("./src/routers/user");
const postRoute = require("./src/routers/task")
const path = require("path")
dotenv.config()


mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("connected to db")
})



// makes post requests from http available to req.body
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// route middlewares
// so everything in the auth route will have this prefix
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", authRoute)
app.use("/", postRoute)
app.use(express.static("views"));

app.listen(3000, () => {
  console.log("server run successfully");
});