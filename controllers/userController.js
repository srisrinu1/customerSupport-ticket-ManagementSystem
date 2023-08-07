const express=require('express');
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/userModel');

//@desc Register a user
//@route POST api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {username,name,email,password}=req.body;
    if(!username || !email || !password || !name){
        res.status(400);
        throw new Error('All fields are mandatory!')
    }
    const userAvailable=await User.findOne({email});
    console.log("Line 16:",userAvailable)
    if(userAvailable){
        res.status(400);
        throw new Error('User already registered')
    }


    //Hash the password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log('Hashed password:'+hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
        name
    });

    if(user){
        res.status(201).json({_id:user.id,email:user.email,name:user.name})
    }
    else{
        res.status(400)
        throw new Error('User data is not valid');
    }

    res.json({message:'Register the user'});



})

//@desc login user
//@route POST api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const user=await User.findOne({email});
    console.log(process.env.SECRET_ACCESS_TOKEN)
    //Compare password and hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                }
            },
                process.env.SECRET_ACCESS_TOKEN,
                {expiresIn:"180m"}

        )
        res.status(200).json({accessToken})
    }
    else{
       res.status(401);
       throw new Error("Password or email is invalid!");
    }
    // res.json({message:'Login user'})
});


//@desc ticket user's info
//@route GET api/users/current
//@access private
const currentUser=asyncHandler(async(req,res)=>{
    res.json({message:'Ticket user info'});
});

module.exports={
    registerUser,
    loginUser,
    currentUser
}