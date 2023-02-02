const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
var bcrypt = require('bcryptjs');


//Coding User's ID and store in Browser
passport.serializeUser((user,done)=>{
    done(null, user.id)

})


//Decoding cookie that stored in User's browser and give us the ID
passport.deserializeUser(async (id,done)=>{
    let user = await User.findById(id)
    if(user) done(null,user)
})  


//********************************* Register Strategy ***************************************** */
// local.register is just an arbitrary  name
passport.use("local.register", new localStrategy(   
    {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    }, async(req, email, password , done)=>{
        try {
            let user = await User.findOne({username : req.body.email})
            if (user){
                return done(null, false, req.flash('errors','This User has  already existed.!!'))
            }
            const newUser = new User({
                name : req.body.name,
                username: req.body.email,
                password: bcrypt.hashSync( req.body.password, 8),
            })

            await newUser.save()
            done(null, newUser)

        } catch (error) {
            return done(error, false, {message:error})
        }

    }
))
//********************************* Login Strategy ***************************************** */
passport.use("local.login", new localStrategy(
{
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
}, async(req, email, password, done)=>{
   try {
    let user = await User.findOne({username : req.body.email})

    if(!user || !bcrypt.compareSync(req.body.password, user.password) ){
        return done(null, false, req.flash('errors','No users have been found!!! '))
    }

    done(null,user) 

   } catch (error) {
    return done(error, false, {message :  error})
   }
    
        }))