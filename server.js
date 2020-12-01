const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const app = express()
const PORT = 3003;


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: 'key',
    resave: true,
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
app.use('/sessions', sessionsController)



mongoose.connect('mongodb://localhost:27017/articles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   })
 mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
 mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})
