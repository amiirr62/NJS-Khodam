const express = require('express')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')



const app = express()
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
    cookie: { secure: true }
  }))
app.use(flash())



app.use('/',require('./routes/user'))

app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})