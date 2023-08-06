const express=require('express');
const { default: mongoose } = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please type the username"]
    },
    email:{
      type:String,
      required:[true,"Please type the email"],
      unique:[true,"email shoud be unique"]
    },
    password:{
        type:String,
        required:[true,"Please type the password"]
    }
},
    {
     timeStamps:true
    }
);

module.exports=mongoose.model("User",userSchema)