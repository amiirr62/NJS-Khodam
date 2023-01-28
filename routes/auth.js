
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const app = express()

const authController = require('../controllers/authController')
const authValidator = require('../validators/authValidator')


router.get('/login', authController.loginForm)
router.get('/register', authController.registerForm)


router.post('/login', authValidator.login(), authController.login)
router.post('/register', authValidator.register(), authController.register)









module.exports = router