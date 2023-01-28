const express = require('express')
let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const app = express()

class UserController extends controller{
    
    async getAllUsers(req,res,next){

       try {
        let users = await User.find({})

        res.render('users' , {users : users , 
                              title : 'The Entire Users', 
                              errors : req.flash('errors') , 
                              message : req.flash('message')})
        
       } catch (err) {
            next(err)
       }
    }

    async seeOneUser(req,res,next){
        try {
            let user = await User.findById({_id : req.params.id})
        
            res.render('user',{user:user}) 
        } catch (err) {
            next(err)
        }
        

    }

    async CreateUser(req,res,next){

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
        
            req.flash('errors', errors.array())
            
            return res.redirect('/')
 
    }
    
    req.body.id = parseInt(req.body.id )
    
        let newUser = new User ({
        
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        age:req.body.age,

    })
    await newUser.save()

    req.flash('message','User successfully created!!') 
    
    return res.redirect('/')
        } catch (err) {
            next(err)
        }

    }

    async UpdateUser(req,res,next){

      try {
        await User.updateMany({_id : req.params.id}, {$set : req.body})

        req.flash('message','User successfully updated!!') 
        
        return res.redirect('/')
      } catch (err) {
        next(err)
      }

    }

    async DeleteUser(req,res,next){

    try {
        await User.deleteOne({_id : req.params.id})
        req.flash('message','User successfully Deleted!!') 
        return res.redirect('/')
    } catch (err) {
        next(err)
    }

    }
}



module.exports = new UserController