const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {type : String},
    img : {type : String},
    username : {type : String, required:true},
    password : {type: String, required:true},
    age : {type : Number}
})

module.exports = mongoose.model('User', userSchema, 'User')


