const express = require('express')
const app = express();
app.use(express.json())
app.listen('3000',(req,res)=>{
    console.log("listening")
});

let userlist=[
    {
        "Name":"Pia",
        "id":1
    },
    {
        "Name":"Ria",
        "id":2
    },
    {
        "Name":"Kartik",
        "id":3
    }
];

const userRouter = express.Router();
app.use('/user',userRouter)

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/:id')
.get(getUserId)

function getUser(req,res){
    res.send(userlist)
}

function getUserId(req,res){
    let paramsId=req.params.id;
    console.log(req.params);
    let obj={}
    for(let i=0;i<userlist.length;i++){
        if(userlist[i]['id']==paramsId)
            obj=userlist[i];
    }
    res.json({
        message:"username received",
        data:obj
    })
}

function postUser(req,res){
    console.log(req.body);
    userlist = req.body;
    res.send({
        message:"data sent successfully",
        userNames:req.body
    })
}

function updateUser(req,res){
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        userlist[key]=dataToBeUpdated[key];
    }
    req.send({
        message:"data updated successfully",
    })
}

function deleteUser(req,res){
    userlist={};
    res.send({
        message:"user data deleted successfully"
    })
}


