const express = require('express')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')



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
    secret: 'doiuhibdshbyeg54sgah67t76-0gd2yg',
    resave: true,
    saveUninitialized: true,
    
    
  }))
app.use(flash())

app.use('/',require('./routes/01-index'))

app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})