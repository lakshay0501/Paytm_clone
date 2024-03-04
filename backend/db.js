const mongoose = require('mongoose');
const { number } = require('zod');

// mongoose.connect('mongodb://localhost:27017/PaytmClone?directConnection=true')
mongoose.connect('mongodb+srv://lakshayarora2905:Rblj2905@m0.hsmbk30.mongodb.net/?retryWrites=true&w=majority&appName=M0')
.then(()=>{
    console.log("database connected")
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const AccountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
    },
    balance:{
        type:Number,
        required:true,
        trim:true,
    }

})



const User = mongoose.model('User',UserSchema);

const Account = mongoose.model('Account',AccountSchema);

module.exports = {
    User,Account
}