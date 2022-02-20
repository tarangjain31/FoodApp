const mongoose = require('mongoose');
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt');
const { append } = require('express/lib/response');
const crypto = require('crypto');
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
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        minLength:8,
        validate: function(){
            return this.password==this.confirmPassword
        }
    },
    role:{
        type:String,
        enum :['user','admin','restaurantOwner','deliveryBoy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetPassword:String
    //resetToken:String
})

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})

// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     console.log(hashedString);
//     this.password = hashedString;
// })

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}
userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
//In mongoose there are 2 types of hooks:
//pre and post pre will always execute before post regardless of the order


// userSchema.pre('save',function(){
//     console.log("before db")
// })

// userSchema.post('save',function(doc){
//     console.log("after db",doc);
// })
