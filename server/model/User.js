const mongoose = require("mongoose"); // Import the mongoose

// Create a Scheme for table
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema); 
