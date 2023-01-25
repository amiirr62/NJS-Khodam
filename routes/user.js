
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const app = express()

const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')


router.get('/', userController.getAllUsers.bind(userController))

router.get('/:id',userController.seeOneUser.bind(userController)) 

router.post('/',userValidator.handle(),userController.CreateUser.bind(userController))

router.put('/:id',userController.UpdateUser.bind(userController))

router.delete('/:id',userController.DeleteUser.bind(userController)) 


module.exports = router