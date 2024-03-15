const zod = require('zod');
const {User,Account} = require('../db')
const {JWT_SECRET} = require('../config')
const JWT = require('jsonwebtoken')
const express = require('express');
const { authMiddleWare } = require('../middleware');

const signUpBody = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const signInBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

const updateInBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

const router = express.Router();

router.route('/').get(function(req,res,next){
    res.send("Hello User");
})

router.post("/signup", async (req, res) => {
    const { success } = signUpBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs##"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs**"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    // create a new bank account
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = JWT.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin',async (req,res)=>{
    
    const {success} = signInBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Please send complete details"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(existingUser){
        const token = JWT.sign({
            userId:existingUser._id
        },JWT_SECRET)

        res.json({
            message:"User signedIn",
            token:token
        })
        return;
    }

     res.status(411).json({
        message: "Error while logging in"
    })

})

router.post('/signout',async(req,res)=>{

    console.log(res);

    res.clearCookie("token");

    res.status(200).json({message:"user logged out successfully"})
})

router.put('/',authMiddleWare,async (req,res)=>{
    const success = updateInBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId},req.body);

    res.json({
        message:"Body Updated successfully"
    })
})

router.get('/bulk',async (req,res)=>{

    const filter = req.query.filter || ""

    const users = await User.find({
       $or : [{
          firstName : {
             $regex:new RegExp(filter, 'i')
          }
       },{
          lastName:{
            $regex:new RegExp(filter, 'i')
          }
       }]
    })

    res.json({
        user:users.map(user=>({
            firstName:user.firstName,
            lastName:user.lastName,
            username:user.username,
            _id:user._id
        }))
    })
})

module.exports = router;