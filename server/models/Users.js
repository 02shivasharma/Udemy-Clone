const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName : {
        type : String, 
        required : true
    },
    userEmail : {
        type : String,
        required :  true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})


const User = new mongoose.model("User", UserSchema);
 
 module.exports = User;