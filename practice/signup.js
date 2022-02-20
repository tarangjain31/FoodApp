const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
app.listen(3001,(req,res)=>{
    console.log('listening')
})

const authRouter = express.Router();
app.use('/auth',authRouter);

authRouter
.route('/signup')
.get(middleware,getSignup)
.post(postSignup)

function middleware(req,res,next){
    console.group("middleware function");
    next();
}

function getSignup(req,res){
    console.log("Sending File");
    res.sendFile("C:\\Users\\tarang.jain\\Desktop\\Backend\\backend1\\public\\index.html")
}

function postSignup(req,res){
    let obj = req.body;
    console.log(obj);
    res.json({
        message:"user signed up successfully",
        data:obj
    })
}

const db_link='mongodb+srv://admin:1eQNWE3OIeLLVdXb@cluster0.96nqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function (db){
    console.log('db connected')
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
})

const userModel = mongoose.model('userModel',userSchema);

(async function createUser(){
    let user={
        name:'Kabir',
        email:"Kabir123@gmail.com",
        password:'kabir123@47',
        confirmPassword:'kabir123@47'
    }
    let data = await userModel.create(user);
    console.log(data);
})();
