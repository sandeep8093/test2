const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    address:[{
        name: {
        type: String,
        required: true
        
    },
    image: {
        type: String,
        
    },
    phone:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },


},
],
        
    createdAt: {
        type: Date,
        default: Date.now,
        expireAfterSeconds: 600,
    }
});

module.exports = mongoose.model("Test Address", addressSchema);