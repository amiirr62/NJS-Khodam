const express = require('express')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const usercontroller = require('../controllers/userController')

 

router.get('/', usercontroller.getAllUsers.bind(usercontroller))

 router.get('/:id',usercontroller.seeOneUser.bind(usercontroller)) 

router.post('/',[body('username','Not a Valid Email!!').isEmail(),
                 body('password','Minimum length is 5 words.').isLength({ min: 1 })], 
                 usercontroller.CreateUser.bind(usercontroller))

router.put('/:id',usercontroller.UpdateUser.bind(usercontroller))

router.delete('/:id',usercontroller.DeleteUser.bind(usercontroller)) 


module.exports = router