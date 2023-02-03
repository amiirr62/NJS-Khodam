

const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const Recaptcha = require('express-recaptcha').RecaptchaV2

var options = { hl: 'en' }
var recaptcha = new Recaptcha('6LdCsUokAAAAAO2K2WiG4s5RuU4mPUE3pF5d1F1P', 
                              '6LdCsUokAAAAAO9GloQa2THTJx-UznJYweA80H_y', options)



class authController {


    async registerForm(req,res,next){
        try {
            return res.render('auth/register', {recaptcha : recaptcha.render()})
        } catch (err) {
            
        }
    }


    async loginForm(req,res,next){
        try {
            return res.render('auth/login', {recaptcha : recaptcha.render()})
        } catch (err) {
            
        }
    }
    

    async register(req,res,next){
        try {
            
           let recaptchaResult =  await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Checkmark Recaptcha !!!')
                        return res.redirect('/auth/register')
                        resolve(false)
                    }else{
                        resolve(true)
                    }
    
                })

            })

            if(!recaptchaResult){
                return 
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg)
                req.flash('errors', myErrors)
            
            return res.redirect('/auth/register' )
        }
           
        passport.authenticate('local.register',{
            successRedirect : '/dashboard',
            failureRedirect : '/auth/register',
            failureFlash : true

          })(req,res,next)
            
        
        } catch (err) {
            next(err)
        }
    }


    async login(req,res,next){
        try {
            
            let recaptchaResult =  await new Promise((resolve,reject)=>{
                recaptcha.verify(req,(err,data)=>{
                    if(err){
                        req.flash('errors','Checkmark Recaptcha !!!')
                        return res.redirect('/auth/login')
                        resolve(false)
                    }else{
                        resolve(true)
                    }
    
                })

            })

            if(!recaptchaResult){
                return 
            }
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
            let myErrors = errors.array().map(err => err.msg)
            req.flash('errors', myErrors)
            
            return res.redirect('/auth/login')
        }
            passport.authenticate('local.login', (err,user)=>{
                if(!user) return res.redirect('/auth/login')

            req.logIn(user, err=>{
              return res.redirect('/dashboard')
            })
          })(req,res,next)
            
        
        } catch (err) {
            next(err)
        }
    }
    
}



module.exports = new authController