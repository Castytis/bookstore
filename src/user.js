const mongoose = require("mongoose")
const validator = require('validator')

const User = mongoose.model("User", {

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },

    login: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 6,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 6,
        lowercase: true,
        trim: true,
        validate(value) {
            if (value.match("password")) {
                throw new Error("Password cannot contain word password ")
            }
        }
    },

    age: {
        type: Number,
        default: 0,
        min: 0,
    }
})

module.exports = User