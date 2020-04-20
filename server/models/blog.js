const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    title: String,
    content: String,
    comments : [{
        writer:String,
        comment: String
    }]
})

module.exports = mongoose.model('blog', userSchema, 'blogs')
