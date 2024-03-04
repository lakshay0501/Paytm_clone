
const express = require('express');
const { default: mongoose } = require('mongoose');
const { authMiddleWare } = require('../middleware');
const {Account} = require('../db')

const router = express.Router()

router.get('/balance',authMiddleWare,async(req,res)=>{
   
    // find if account exists
   
    console.log(req.userId)
   
    const account = await Account.findOne({
        userId:req.userId
    })

    console.log(account)

    if(!account){
        return res.status(403).json({
            message:'Account does not exists'
        })
    }

    res.json({
        message:`Your balance in account is ${account.balance}`,
        balance:account.balance
    })
})

router.post('/transfer',authMiddleWare,async(req,res)=>{
    // steps involved :-
    // 1) check if the amount that is to be transfered is greater than available account balance , if it is not 
    // then transfer won't be possible
    // 2) Find the account to which money is to be transfered to , if the account does not exists then return 
    // response as account does not exist
    // 3) If everything goes well just update balance from both accounts , as simple as that :)
   
    try{
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;

        // console.log(req.userId)

        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        // console.log(account)

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
   } catch(error){
         console.log(`error :${error}`)
   }

    
})

module.exports = router

