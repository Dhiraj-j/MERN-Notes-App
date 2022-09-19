const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            
            type:String,
            required:true,
        
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        },
        pic:{
            type:String,
            required:true,
            default:"https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1655412534~hmac=73253676840f3bbb43090dd216c03b62",
        },
    },
    {

        timestamps:true,
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;