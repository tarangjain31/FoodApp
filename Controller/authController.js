const express = require("express");
const req = require("express/lib/request");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const JWT_Key = 'jdnehfu8f439hrnurn7584h3'

module.exports.signup = async function(req, res) {
    try {
        let dataObj = req.body;
        console.log(req.body);
        let userObj = await userModel.create(dataObj);
        if (userObj) {
             res.json({
                message: 'user signed up successfully',
                data: userObj
            })
        }
        else {
             res.json({
                message: 'Error'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.login = async function (req, res) {
    console.log(req.body);
    let emailReceived = req.body.email;
    let passwordReceived = req.body.password;
    let user = await userModel.findOne({ email: emailReceived });
    console.log()
    try {
        if (user) {
            if (user.password == passwordReceived) {
                let uid = user['_id']
                let token = jwt.sign({ payload: uid }, JWT_Key)
                res.cookie('isLoggedIn', token, { httpOnly: true })
                res.json({
                    message: "login successful"
                })
            }
            else {
                res.json({
                    message: "incorrect password"
                })
            }
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
}

module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {  //this style of writing
        if (roles.includes(req.role) == true) { //why not req.role=='admin' ASK
            next();
        }
        else {
            res.status(401).json({
                message: 'invalid request'
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try{
    let token;
    console.log("In protectRoute!!");
    if (req.cookies.isLoggedIn) {
        console.log(res.cookies);
        console.log(req.cookies.isLoggedIn);
        token = req.cookies.isLoggedIn;
        let payload = jwt.verify(token, JWT_Key); //this is a token
        if (payload) {
            console.log('payload token',payload);
            const user = await userModel.findById(payload.payload); 
            req.role = user.role;
            req.id = user.id;
            console.log(req.role);
            console.log(req.id);
            next();
            }
        }
        else {
            const client = req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');
              }
              else{
                return res.json({
                    message: "please login first",
              })
            }

        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.forgotPassword = async function forgotPassword(req,res){
    let {email} = req.email;
    let user = await userModel.findOne({email:email});
    try{
        if(user){
            const resetToken = user.createResetToken(); 
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //return res.redirect('/resetPasswordLink) or why not using next to redirect it to resetPassword
        }
        else{
            return res.json({
                message:'please sign up'
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.resetPassword = async function resetPassword(req,res){
try{
    const token = req.params.token; 
    let {password,confirmPassword} = req.body; 
    const user = await userModel.findOne({resetToken:token});
    user.resetPasswordHandler(password,confirmPassword);
    if(user){
        await user.save();
        res.json({
            message:'password changed successfully'
        })
    }
    else{
        res.json({
            message:'user not found'
        })
    }
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.logout = async function logout(req,res){
    res.cookie(isLoggedIn,'',{maxAge:1});
    res.json({
        message:'user logged out successfully'
    })
}