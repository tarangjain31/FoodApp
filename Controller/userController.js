const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req,res){
    let id = req.id;
    let user = await userModel.findById(id);
    //let user = await userModel.findOne({name:'Kabir'})
    console.log("user",user);
    if(user){
        return res.json({
            message:"data received",
            data:user
        })
    }
    else{
        return res.json({
            message:'user profile not found'
        })
    }
}

// module.exports.postData = async function postData(req,res){
//     let dataObj = req.body;
//     let user = await userModel.create(dataObj);
//     console.log(user);
//     res.json({
//         message:"sign up successful",
//         data:user
//     })
// }

module.exports.updateData = async function updateData(req,res){
    console.log("In update User!!");
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let user = await userModel.findById(id);
    try{
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save(); //save works on document level in mongodb
            res.json({
                message:"data updated successfully",
                data:updatedData
            })
        }
        else{
            res.json({
                message: "user doesn't exist "
            })
        }
    }
    catch (err){
        res.json({
            message: err.message
        })
    }
    //let user = await userModel.findOneAndUpdate({email:req.body.email},dataToBeUpdated);
}

module.exports.deleteUser = async function deleteUser(req,res){
    //let userToBeDeleted = req.body; here in postman in body you will have to specify the email
    //let user = await userModel.findOneAndDelete(userToBeDeleted);
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    console.log("user = ",user);
    //let user = await userModel.findOneAndDelete({email:req.body.email});
    if(user){
        res.json({
            message:"user deleted successfully",
            data:user
        })
    }
    else{
        res.json({
            message:"user not found",
            data:user
        })
    }    
}

module.exports.getAllUsers = async function getAllUsers(req,res){
    //console.log(req.params.username);
    //console.log(req.params);
    let userList = await userModel.find();
    res.json({
        data:userList
    })
}

// function setCookies(req,res){
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true}); //the cookie will expire after a day
//     res.send('cookies have been sent');
// }

// function getCookies(req,res){
//     console.log(req.cookies);
//     console.log(req.cookies.isLoggedIn); 
//     res.send({
//         message:"cookies received",
//         data:req.cookies
//     })
// }

