const userModel = require('../models/userModel');


// user functions

module.exports.getAllUsers = async function getAllUsers(req,res){
    try {
        let allUsers = await userModel.find();
        res.json({
            message:"List of all users is : ",
            data : allUsers
        });
    } 
    catch (error) {
        res.json({
            message:error.message
        })
    }
    
}
module.exports.getUser = async function getUser(req,res){
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:'user not found'
        })
    }
}
// module.exports.postUsers =function postUsers(req,res){
//     console.log(req.body);
//     // rememeber to use app.use express.json
//     users = req.body;
//     res.json({
//         message:"data recieved successfully!!!",
//         data: req.body
//     });
// }
module.exports.updateUsers = async function updateUsers(req,res){
    try{
        let id =  req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        if(user){
            const keys = [];
            for(let key in dataToBeUpdated ){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message:"data updated successfully!!!"
            });
        }
        else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}
module.exports.deleteUsers = async function deleteUsers(req,res){
    try{
        let id = req.params.id
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:"user not found"
            })
        }
        res.json({
            message:"data deleted successfully",
            data : user
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
}
module.exports.getUserById = function getUserById(req,res){
    console.log(req.params.id);
    console.log(req.params.name);
    res.json({
        message:"id recieved successfully!!",
    })
}
// function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn = true');
//     res.cookie('isLoggedIn',false,{maxAge:1000*60*60*24,secure:true,httpOnly:true});// setting cookie's expiring time to 24 hrs
//     res.send('cookies has been sent');
// }
// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies recieved successfully");
// }


// Authentication

// function middleware1(req,res,next){
//     console.log("middleware function one called");
//     next();
// }
// function middleware2(req,res,next){
//     console.log("middleware function two called");
// }
module.exports.getSignup = function getSignup(req,res,next){
    console.log("Get signup called");
    res.sendFile('signup.html',{root:__dirname});
    next();
}
module.exports.postSignup =async function postSignup(req,res){
    let obj = req.body;
    let user = await userModel.create(obj);
    console.log('backend ',obj);
    res.json({
        message:"user signed up successfully!!!",
        data: user
    })
}
module.exports.loginUser =async function loginUser(req,res){

    try {
        let data = req.body;
        let user = await userModel.findOne({email:data.email});
        if(data.email){
            if(user){
                if(data.password == user.password){
                    // res.cookie('isLoggedIn',true,{httpOnly:true});
                    let uid = user['_id']; 
                    let token = jwt.sign({payLoad:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true });
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