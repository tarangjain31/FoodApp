const { query } = require('express');
const express = require('express')
const app = express();
app.use(express.json())
app.listen(3000,(req,res)=>{
    console.log("listening")
})

let userlist = {};
app.get('/user',(req,res)=>{
    //res.send(userlist)
    res.json({
        message:"data successfully fetched",
        USERLIST:userlist
    })
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    userlist = req.body;
    res.json({
        message:"data successfully received",
        userName:req.body
    })
})

app.patch('/user',(req,res)=>{
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        userlist[key]=dataToBeUpdated[key];
    }
    console.log(userlist)
    res.json({
        message:"data updated",
    })
})

app.delete("/user",(req,res)=>{
    userlist={};
    res.json({
        message:"data has been deleted"
    })
})

//Params fetch the exact data 
app.get("/user/:userName",(req,res)=>{
    let paramsId=req.params.userName;
    console.log(req.params);
    let obj={}
    for(let i=0;i<userlist.length;i++){
        if(userlist[i][id]==paramsId)
            obj=userlist[i];
    }
    res.json({
        message:"username received",
        data:obj
    })
})

//Queries work as filters..at a time only one get request can work so link it with some other router 
app.get("/user",(req,res)=>{
    console.log(req.query);
   res.status(200).json({
    message:"User added!!",
   })
})