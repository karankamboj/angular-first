const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    name : String,
    designation: String,
    college: String,
    about : String,
    avatar: Buffer
})

module.exports = mongoose.model('user', userSchema, 'users')
