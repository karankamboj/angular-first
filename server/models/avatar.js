const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
   avatar : Buffer
})

module.exports = mongoose.model('avatar', userSchema, 'avatars')