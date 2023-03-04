const express = require('express');
const app = express();
const userModel = require('./models/userModel');
const cookieParser = require('cookie-parser');
// express.json() is a middleware function
app.use(express.json());
app.listen(3001);
app.use(cookieParser());
// let users=[
//     {
//         'id':1,
//         "name":"abhishek"
//     },
//     {
//         'id':2,
//         "name":"shweta"
//     },
//     {
//         'id':3,
//         "name":"krushna"
//     }
// ];

// Mini App

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
app.use('/users',userRouter);
app.use('/auth',authRouter);


// userRouter
// .route('/')
// .get(getUsers)
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


// authRouter
// .route('/signup')
// .get(middleware1,getSignup,middleware2)
// .post(postSignup)


// Constructing a mini app



// function middleware1(req,res,next){
//     console.log("middleware function one called");
//     next();
// }
// function middleware2(req,res,next){
//     console.log("middleware function two called");
// }
// async function getUsers(req,res){
//     let allUsers = await userModel.findOne({name:"Abhishek"});
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
// function getSignup(req,res,next){
//     console.log("Get signup called");
//     res.sendFile('signup.html',{root:__dirname});
//     next();
// }
// async function postSignup(req,res){
//     let obj = req.body;
//     let user = await userModel.create(obj);
//     console.log('backend ',obj);
//     res.json({
//         message:"user signed up successfully!!!",
//         data: user
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

// // Mongo DB 
// const db_link = 'mongodb+srv://Abhishek:ESoXtw4TFxFqDyRe@cluster0.xgxgrhx.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(db_link).then(function(db){
//     console.log('db connected');
// })
// .catch(function(err){
//     console.log("error is : ",err);
// })

// // user schema
// const userSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         validate:function(){
//             return emailValidator.validate(this.email);
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8
//     },
//     confirmPassword:{
//         type:String,
//         required:true,
//         minLength:8,
//         validate:function(){
//             return this.password == this.confirmPassword;
//         }
//     }
// })

// // Hooks are the facilities provided by mongodb to perform some operation before or after saving some information in database
// // pre hook runs before saving the database
// userSchema.pre('save',function(){
//     // console.log("before saving in database: ",this);
//     this.confirmPassword = undefined;
//     // check if password and confirm password are same or not
// })
// // post hook runs after saving the database
// userSchema.post('save',function(doc){
//     console.log("after saving in database: ",doc);
// })

// // models

// const userModel = mongoose.model('userModel',userSchema);
// functions

// (async function createUser(){
//     let user = {
//         name:'Krushna',
//         email:'khairnarabhi22@gmail.com',
//         password: '12345679',
//         confirmPassword:'12345670'
//     }
//     // it is a promise base activity so we will use async await function
//     const data = await userModel.create(user);
//     console.log(data);
// })();



// get request for getting all users
// app.get('/',(req,res)=>{
//     res.send('hello world');
// })
// app.get('/users',(req,res)=>{
//     res.send(users);
// })
// app.post('/users',(req,res)=>{
//     console.log(req.body);
//     // rememeber to use app.use express.json
//     users = req.body;
//     res.json({
//         message:"data recieved successfully!!!",
//         data: req.body
//     });
// })
// // for update - patch request   
// app.patch('/users',(req,res)=>{
//     console.log(req.body);
//     let dataToBeUpdated = req.body;
//     for(key in req.body){
//         users[key] = dataToBeUpdated[key];
//     }
//     res.json({
//         message:"data updated successfully!!!"
//     });
// })
// // to delete the data
// app.delete('/users',(req,res)=>{
//     users = {};
//     res.json({
//         message:"data deleted successfully"
//     })
// })
// // params
// app.get('/users/:id',(req,res)=>{
//     console.log(req.params.id);
//     res.json({
//         message:"id recieved successfully!!"
//     })
// })
// // queries
// app.get('/users',(req,res)=>{
//     console.log(req.json.query);
//     res.json({
//         message:"query recieved successfully!!!"
//     })
// })




// Notes :
// Middleware functions we can say all of the functions we use in our backend are middleware functions they are supposed to execute one after another line by line
