const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        require: [true, "Your Email address is required"],
        unique: true
    },
    username:{
        type: String,
        require: [true, "Your user name is required"],
    },
    firstname:{
        type:String,
        default:"",
    },
    lastname:{
        type:String,
        default:"",
    },
    contact_number:{
        type:String,
        default:"",
    },
    password:{
        type: String,
        require: [true, "Your password is required"],
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    updatedAt:{
        type: Date,
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
