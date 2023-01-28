
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')


class authController extends controller{


    async registerForm(req,res,next){
        try {
            return res.render('auth/register')
        } catch (err) {
            
        }
    }


    async loginForm(req,res,next){
        try {
            return res.render('auth/login')
        } catch (err) {
            
        }
    }
    

    async register(req,res,next){
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
        
            req.flash('errors', errors.array())
            
            return res.redirect('/auth/register' )
        }
           console.log('register posted...')
            
        
        } catch (err) {
            next(err)
        }
    }


    async login(req,res,next){
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
        
            req.flash('errors', errors.array())
            
            return res.redirect('/auth/login')
        }
           console.log('login posted...')
            
        
        } catch (err) {
            next(err)
        }
    }
    
}



module.exports = new authController