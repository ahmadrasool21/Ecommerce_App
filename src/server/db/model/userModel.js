const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true
    // },

}, {timestamps: true})


module.exports = new mongoose.model("User", userSchema)