const mongoose = require('mongoose');
const { append } = require('express/lib/response');
const db_link='mongodb+srv://admin:1eQNWE3OIeLLVdXb@cluster0.96nqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function (db){
    console.log('plan db connected')
})
.catch(function(err){
    console.log(err);
})
const planSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,"plan name shouldn't exceed more than 20 characters"]
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number,
    },
    discount:{
        type:Number,
        validate: [function(){
            return this.discount<100
        },"discount shouldn't exceed price"]
    }
})
const planModel = mongoose.model('planModel',planSchema);
// (async function createPlan(){
//     let planObj={
//         name:'SuperFood',
//         duration:5,
//         price:100,
//         ratingsAverage:4,
//         disocunt:30
//     }
//     let data = await planModel.create(planObj);
//     console.log(data);
// })();


module.exports = planModel;