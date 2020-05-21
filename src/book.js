const mongoose = require("mongoose")
const validator = require('validator')

const Book = mongoose.model("Book", {

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    
    author: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        maxlength: 100
    },

    description: {
        type: String,
        trim: true,
        maxlength: 256
    },

    date: {
        type: Date,
        default: Date.now,

    },

    inStock: {
        type: Boolean,
        default: false
    }


})

module.exports = Book