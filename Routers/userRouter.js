const express = require('express');
const userRouter = express.Router();
// const userModel = require('../models/userModel');
const protectRoute = require('../Routers/authHelper');
const{getUsers,updateUsers,deleteUsers,getUserById} = require('../controller/userController')

//user options  
userRouter.route('/:id')
.patch(updateUsers)
.delete(deleteUsers)
//profile page
app.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUsers)

// admin specific routes
app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUsers)

// userRouter
// .route('/')
// .get(protectRoute,getUsers) // path specific middleware
// .post(postUsers)
// .patch(updateUsers)
// .delete(deleteUsers)

// userRouter
// .route('/getCookies')
// .get(getCookies)

// userRouter
// .route('/setCookies')
// .get(setCookies)

// userRouter
// .route('/:id')
// .get(getUserById)


// async function getUsers(req,res){
//     let allUsers = await userModel.find();
//     res.json({
//         message:"List of all users is : ",
//         data : allUsers
//     });
// }
// function postUsers(req,res){
//     console.log(req.body);
//     // rememeber to use app.use express.json
//     users = req.body;
//     res.json({
//         message:"data recieved successfully!!!",
//         data: req.body
//     });
// }
// async function updateUsers(req,res){
//     console.log(req.body);
//     let dataToBeUpdated = req.body;
//     let user = await userModel.findOneAndUpdate({email:"khairnarabhi25@gmail.com"},dataToBeUpdated);
//     // for(key in req.body){
//     //     users[key] = dataToBeUpdated[key];
//     // }
//     res.json({
//         message:"data updated successfully!!!"
//     });
// }
// async function deleteUsers(req,res){
//     let datatoBedeleted = req.body;
//     let user = await userModel.findOneAndDelete(datatoBedeleted);
//     res.json({
//         message:"data deleted successfully",
//         data : user
//     })
// }
// function getUserById(req,res){
//     console.log(req.params.id);
//     console.log(req.params.name);
//     res.json({
//         message:"id recieved successfully!!",
//     })
// }
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

module.exports = userRouter;