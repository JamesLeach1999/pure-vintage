const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routers/user');
const postRoute = require('./routers/product');
const orderRoute = require('./routers/order');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require("cloudinary")
// using dotenv to get environment variables
// app.use(cors())




require('./middleware/passport')(passport);

var fileUpload = require('express-fileupload');

app.use(
  fileUpload({
    useTempFiles: true,
  })
);


const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:5000',
  'https://cryptic-temple-54361.herokuapp.com',
  'https://cryptic-temple-54361.herokuapp.com/',
];
// accepting only certain headers
const corsOptions = {
  origin: function (origin, callback) {
    console.log('** Origin of request ' + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('Origin acceptable');
      callback(null, true);
    } else {
      console.log('Origin rejected');
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(
  cors({
    exposedHeaders: ['Content-Range', "names 0-20/20"],
  })
);
app.use(cors(corsOptions));

console.log(process.env.PORT);
// connect to mongo via env variable
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  () => {
    console.log('connected to db');
  }
);

// makes post requests from http available to req.body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// body parser, to get form data

app.use(bodyParser.urlencoded({ extended: true }));

// express session, nthese are just for messages, saved in the session i guess

app.use(
  session({
    secret: process.env.EXPRESS_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 20000000000 },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser(process.env.EXPRESS_SESSION));

// route middlewares
// so everything in the auth route will have this prefix
app.use('/', authRoute);
app.use('/products', postRoute);
app.use('/', orderRoute);

app.use(express.static('work/build'));

// configuration for heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('work/build'));

  app.get('*', (req, res) => {
    // serving react files here to the browser
    res.sendFile(path.resolve(__dirname, "../work", "build", "index.html"));
  });
} else {
  app.use(express.static('work/build'));

  app.get('*', (req, res) => {
    // serving react files here to the browser
    res.sendFile(path.resolve(__dirname, '../work', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log('server run successfully');
});
