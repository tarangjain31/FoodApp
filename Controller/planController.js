const express = require("express")
const planModel = require('../models/planModel');

module.exports.getAllPlans = async function (req,res){
    try{
        let planList = await planModel.find();
        if(planList){
            res.json({
                message:'user list displayed',
                data:planList
            })
        }
        else{
            return res.json({
                message:'plans dont exist'
            })
        }
    }
    catch(err){
        message:err.message
    }
}

module.exports.getPlan = async function (req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                message:'plan fetched',
                data:plan
            })
        }
        else{
            return res.json({
                message: "plan doesn't exist"
            })           
        }

    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function(req,res){
    try{
        let plan = await planModel.create(req.body);
        res.json({
            message:'plan created successfully',
            data:plan
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deletePlan = async function(req,res){
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    res.json({
        message:'plan deleted successfully',
        data:deletedPlan
    })
}

module.exports.updatePlan = async function(req,res){
    try{
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let plan = await planModel.findById(id);
        if(plan){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
            plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await plan.save(); //save works on document level in mongodb
            res.json({
                message:"data updated successfully",
                data:updatedData
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.top3Plans = async function(req,res){
    try{
    let top3 = await planModel.find().sort({
        ratingsAverage:-1
    }).limit(3);

    res.json({
        message:'top 3 plans fetched',
        data:top3
    })

    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}