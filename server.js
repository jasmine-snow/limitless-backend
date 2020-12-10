require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const app = express()
const PORT = process.env.PORT || 3005;
const cors = require('cors')



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cors

const whitelist = ['https://limitless-frontend.herokuapp.com', 'http://localhost:3000', 'https://fifth-hour-backend.herokuapp.com']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

// sessions
app.set('trust proxy', 1)
app.use(session({
    cookie: { secure: true },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))


// delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// articles controller
const articlesController = require('./controllers/articles.js')
app.use('/articles', articlesController)

// users controller
const usersController = require('./controllers/users.js')
app.use('/users', usersController)

//sessions controller
const sessionsController = require('./controllers/sessions.js')
app.use('/login', sessionsController)

// mongoose connection
const mongoURI = process.env.MONGODBURI + "/articles"

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})
