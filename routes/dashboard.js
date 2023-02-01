
const express = require('express')

const router = express.Router()


const dashboardController = require('../controllers/dashboardController')

//*********** Dashboard and Login Authentication **********************

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/login')
})
//******************************************************************* */
router.get("/", dashboardController.index)




module.exports = router