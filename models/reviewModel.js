const { get } = require('express/lib/response');
const mongoose = require('mongoose');
const { post, patch } = require('../Routers/reviewRouter');
const db_link='mongodb+srv://admin:1eQNWE3OIeLLVdXb@cluster0.96nqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("review db connected")
})
.catch(function(err){
    console.log(err);
})
const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'reviewer must have a plan']
    }
})
reviewSchema.pre(/^find/,function (next){
    this.populate({
        path:"user",
        select: "name profileImage"
    }).populate("plan");
    next();
})
const reviewModel = mongoose.model('reviewModel',reviewSchema)
module.exports = reviewModel


