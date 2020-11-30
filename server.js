const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3003


app.use(express.json());
app.use(express.urlencoded({extended: true}));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/articles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})


const session = require('express-session');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))


// articles controller
const articlesController = require('./controllers/articles.js')
app.use('/articles', articlesController)

// users controller
const usersController = require('./controllers/users.js')
app.use('/users', usersController)

//sessions controller
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)


app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})
