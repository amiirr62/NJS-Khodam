const validator = require('../validators/validator')
const { body } = require('express-validator')

class userValidator extends validator {
    register(){
        return [body('name','Enter your name').not().isEmpty(),
                body('email','Not a Valid Email!!').isEmail(),
                body('password','Minimum length is 1 word.').isLength({ min: 1 })]
    }

    login(){
        return [body('email','Not a Valid Email!!').isEmail(),
                body('password','Minimum length is 1 words.').isLength({ min: 1 })]
    }
}

module.exports = new userValidator