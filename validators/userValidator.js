const validator = require('../validators/validator')
const { body } = require('express-validator')

class userValidator extends validator {
    handle(){
        return [body('username','Not a Valid Email!!').isEmail(),
                body('password','Minimum length is 5 words.').isLength({ min: 1 })]
    }
}

module.exports = new userValidator