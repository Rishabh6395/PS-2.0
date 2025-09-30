const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true
        }
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
}, {timestamps: true})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin