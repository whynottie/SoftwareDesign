const mongoose = require(mongoose)

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile : [profileSchema]
})

module.exports = mongoose.model('User', userSchema)