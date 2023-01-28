const { application } = require('express')
const express = require('express')
const config = require('../config')
const { route } = require('./user')
const router = express.Router()



router.use('/',require('./user'))

router.use('/auth', require('./auth'))




router.all('*', async(req,res,next)=>{
    
    try {
     let err = new Error('Not Available Route')
     err.status = 404
     throw err   
    } catch (err) {
        next(err)
    }
})
//Method to Manage All Errors here

router.use(async(err,req,res,next)=>{
    const code = err.status || 500
    const message = err.message || ""
    const stack = err.stack || ""

if (config.debug){
    return res.render('errors/developer',{code ,message , stack})
}else{
    return res.render('errors/regUser',{code , message})
}

})



module.exports = router