const reviewModel = require('../models/reviewModel')
const planModel = require('../models/planModel')

module.exports.getAllReviews = async function(req,res){
    try{
        const reviewList = await reviewModel.find();
        if(reviewList){
            res.json({
                message:'reviews are:',
                data:reviewList
            })
        }
        else{
            res.json({
                message:'no reviews'
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.top3 = async function(req,res){
    try{
        const reviewList = await reviewModel.find().sort({
            rating:-1
        }).limit(3);
        if(reviewList){
            res.json({
                message:'top 3 reviews are',
                data:reviewList
            })
        }
        else{
            res.json({
                message:'top 3 reviews not found'
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.getPlanReviews = async function(req,res){  
    try{
        const planid = req.params.id;
        let plan = await planModel.findById(planid);
        let reviews = await reviewModel.find();
        reviews=reviews.filter(review => review.plan._id==planid)
        if(reviews){
            return res.json({
                message:'review fetched',
                data:reviews
            })
        }
        else{
            return res.json({
                message: "review doesn't exist"
            })           
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.createReview = async function(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        let review = await reviewModel.create(req.body);
        //plan.ratingsAverage = (plan.ratingsAverage+req.body.rating)/2; //ASK
        await review.save;
        res.json({
            message:'review created successfully',
            data:review
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.updateReview = async function(req,res){
    try{
        let id = req.params.id;
        let datatobeupdated = req.body;
        let review = await reviewModel.findById(id);
        const keys=[];
        for(let key in datatobeupdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            review[keys[i]] = datatobeupdated[keys[i]];
        }
        const updatedData = await review.save();
        res.json({
            message:"data updated successfully",
            data:updatedData
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteReview = async function(req,res){
    try{
        console.log("**********");
        let id = req.params.id;
        console.log(id);
        let review = await reviewModel.findByIdAndDelete(id);
        console.log(review);
        res.json({
            message:"deleted successfully"
        })
    }
    catch(err){
        console.log("**********");
        res.json({
            message:err.message
        })
    }
}