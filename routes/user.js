const express = require('express')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()



router.get('/', async (req,res)=>{


    let users = await User.find({})
    res.render('users' , {users : users , 
                          title : 'The Entire Users', 
                          errors : req.flash('errors') , 
                          message : req.flash('message')}
                        )
    
})

 router.get('/:id',(async(req,res)=>{
    let user = await User.findById({_id : req.params.id})
   res.render('user',{user:user})   

      
})) 

router.post('/',[body('username','Not a Valid Email!!').isEmail(),
                 body('password','Minimum length is 5 words.').isLength({ min: 1 })], (async function(req,res){
    
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
))

router.put('/:id',async(req,res)=>{
        await User.updateMany({_id : req.params.id}, {$set : req.body})

    req.flash('message','User successfully updated!!') 
    
    return res.redirect('/')
})

router.delete('/:id',async(req,res)=>{
    await User.deleteOne({_id : req.params.id})
    req.flash('message','User successfully Deleted!!') 
    return res.redirect('/')
}) 


module.exports = router