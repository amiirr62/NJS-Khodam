let controller = require('./controller')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')


class UserController extends controller{
    async getAllUsers(req,res){

        let users = await User.find({})

        res.render('users' , {users : users , 
                              title : 'The Entire Users', 
                              errors : req.flash('errors') , 
                              message : req.flash('message')}
                        )
    }

    async seeOneUser(req,res){

        let user = await User.findById({_id : req.params.id})
        
        res.render('user',{user:user}) 

    }

    async CreateUser(req,res){

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

    }

    async UpdateUser(req,res){

        await User.updateMany({_id : req.params.id}, {$set : req.body})

        req.flash('message','User successfully updated!!') 
        
        return res.redirect('/')

    }

    async DeleteUser(req,res){

        await User.deleteOne({_id : req.params.id})
        req.flash('message','User successfully Deleted!!') 
        return res.redirect('/')

    }
}



module.exports = new UserController