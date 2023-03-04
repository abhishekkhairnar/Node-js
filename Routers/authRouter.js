const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');



authRouter
.route('/signup')
.get(middleware1,getSignup,middleware2)
.post(postSignup)

authRouter
.route('/login')
.post(loginUser)

function middleware1(req,res,next){
    console.log("middleware function one called");
    next();
}
function middleware2(req,res,next){
    console.log("middleware function two called");
}
function getSignup(req,res,next){
    console.log("Get signup called");
    res.sendFile('signup.html',{root:__dirname});
    next();
}
async function postSignup(req,res){
    let obj = req.body;
    let user = await userModel.create(obj);
    console.log('backend ',obj);
    res.json({
        message:"user signed up successfully!!!",
        data: user
    })
}
async function loginUser(req,res){

    try {
        let data = req.body;
        let user = await userModel.findOne({email:data.email});
        if(data.email){
            if(user){
                if(data.password == user.password){
                    res.cookie('isLoggedIn',true,{httpOnly:true});
                    res.json({
                        message:"User logged in successfully",
                        userDetails:data
                    })
                }
                else{
                    res.cookie('isLoggedIn',false,{httpOnly:true});
                    res.json({
                        message:"Invalid credentials"
                    })
                }
            }
            else{
                res.json({
                    message:"user not found"
                })
            }
        }
        else{
            res.json({
                message:"user not found"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }


    
}

module.exports = authRouter;