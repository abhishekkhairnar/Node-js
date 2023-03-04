const mongoose = require('mongoose');
// const userModel = require('../models/userModel');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
// Mongo DB 
const db_link = 'mongodb+srv://Abhishek:ESoXtw4TFxFqDyRe@cluster0.xgxgrhx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log("error is : ",err);
})
// user schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    }
})

// hooks
// userSchema.pre('save',async function(){
//     this.confirmPassword = undefined;
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
// })


// models
const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;