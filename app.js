const express = require ('express');
const pageRoutes = require('./routes/pageRoutes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv').config() //config method loads environment variabes into process.env
const bcrypt = require ('bcryptjs')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)


// constant
const { DB_PASSWORD, PORT} = process.env
const port = PORT || 5000


// express app
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://group2:${DB_PASSWORD}@nodetuts.sgeguvp.mongodb.net/group-2?retryWrites=true&w=majority`
mongoose.connect(dbURI)
    .then((result) => app.listen(port), console.log('Server running on port 5000...'))
    .catch((err) => console.log(err));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //accepts form data
app.use(morgan('dev'))
app.use(session({ 
    
    name: 'SESS_NAME',
    resave: false,
    saveUninitialized: false,
    secret: 'SESS_SECRET',
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      maxAge: 7200000,  //how long a session lasts
      sameSite: true
    }
  }))

// routes
app.use('/user', pageRoutes)

app.use((req, res) => {
    res.status(404).render('', {title: '404'})
})