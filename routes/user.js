
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const app = express()

const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')


router.get('/', userController.getAllUsers)

router.get('/:id',userController.seeOneUser) 

router.post('/',userValidator.handle(),userController.createUser)

router.put('/:id',userController.UpdateUser)

router.delete('/:id',userController.DeleteUser) 


module.exports = router