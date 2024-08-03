const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userschema = new mongoose.Schema({
    name :{
        type : String,
        required :[true, "Name is required"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Email is Required!"]
    },
    password : {
        type : String,
        required : [true, "Password is Required"]
    },
});

//Hash password before saving user to database
//This is a middleware(userschema.pre)
userschema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);// number of bytes to hash the password( if it increasing, it will be more secure)
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const User = mongoose.model("User", userschema) // model creation

module.exports ={ User } ;//export module