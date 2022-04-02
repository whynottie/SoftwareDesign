const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
       type : String
    },
    address1: {
        type : String
    },
    address2: {
        type : String
    },
    city : {
        type: String
    },
    state : {
        type: String
    },
    zip: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)