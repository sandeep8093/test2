const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        expireAfterSeconds: 600,
    }
});

module.exports = mongoose.model("Book", bookSchema);