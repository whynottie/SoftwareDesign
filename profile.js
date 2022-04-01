const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    address1: {
        type : String,
        requied : true
    },
    address2: {
        type : String
    },
    city : {
        type: String,
        required : true
    },
    state : {
        type: String,
        required : true
    },
    zip: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Profile', profileSchema)