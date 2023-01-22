const express = require('express')
let User = require('../user')
const { body, validationResult } = require('express-validator')
const router = express.Router()



router.get('/',(function(req,res){
   
    res.render('users',{User:User, title:'All Users', 
                errors:req.flash('errors'),
                message:req.flash('message')})
    
}))

router.get('/:id',((req,res)=>{
    let user =  User.find(usr => {
                        if(usr.id == req.params.id){
                            return usr
                        }
                    }) 
   res.render('user',{user:user})   
    
}))

router.post('/',[body('username','Not a Valid Email!!').isEmail(),
                 body('password','Minimum length is 5 words.').isLength({ min: 5 })], (function(req,res){
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        
        req.flash('errors', errors.array())
        
        return res.redirect('/')
 
    }
    
    req.body.id = parseInt(req.body.id )
    User.push(req.body)
    req.flash('message','User successfully created!!') 
    
    return res.redirect('/')
   }
))

router.put('/:id',(req,res)=>{
        User = User.map(usr => {
        if(usr.id == req.params.id){
            req.body.id = parseInt(req.body.id)
            return req.body
        }else{
            return usr
        }
    })
    req.flash('message','User successfully updated!!') 
    return res.redirect('/')
})

router.delete('/:id',(req,res)=>{
    User = User.filter(usr => {
        if(usr.id != req.params.id){
            return usr
        }
    })
    req.flash('message','User successfully Deleted!!') 
    return res.redirect('/')
})


module.exports = router