const express = require('express')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const mongoose = require('mongoose')

const MongoStore = require('connect-mongo')


const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/NJS-Khodam').then(() => console.log('Connected!'))
mongoose.set('strictQuery', false)
app.use(express.static(__dirname + '/public'))
global.config = require('./config')
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')

app.use(methodOverride('method'))

app.use(cookieParser('hbdakq2eq2q5546535qopkosqnwx9849'))

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie : {expires : new Date(Date.now() + (1000 * 3600 * 24 * 100)) ,
              store   : MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/NJS-Khodam' })
             }
}))


app.use(flash())  

require('./passport/passport-local')
app.use(passport.initialize())
app.use(passport.session())





app.use((req,res,next)=>{
  res.locals = {errors : req.flash('errors'), req }     ///We access to req in all views
  next()
})

//Passing to 01-index.js for routing table
app.use('/',require('./routes/01-index'))





app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})