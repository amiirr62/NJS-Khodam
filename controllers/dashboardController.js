
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const passport = require('passport')





module.exports = new class dashboardController  {
    
    async index(req,res,next){

       try {
        return res.render('dashboard/index')
        
       } catch (err) {
            next(err)
       }
    }

    async edituser(req,res,next){
        try {
          const errors = validationResult(req)
                if (!errors.isEmpty()){      
                let myErrors = errors.array().map(err => err.msg)        
                  req.flash('errors', myErrors)     
                  return res.redirect('/dashboard') } 
  
          let data = {
            name : req.body.name,
          }

          if(req.file){  // if any file has been uploaded
            data.img = req.file.path.replace(/\\/g,'/').substring(6)
          }
          
          await User.updateOne({_id : req.user.id}, {$set : data})
          res.redirect('/dashboard')
        }
        
        catch (err) {
              next(err)
        }
      }
  }
  



   


