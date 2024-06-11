import expres from "express";
import { authMiddleware } from "../middleware.js";
import { Account } from "../db.js";
import mongoose from "mongoose";

const accRouter = expres.Router();

// endpoint definition for fetching the account balance 
accRouter.get("/balance", authMiddleware,async ( req,res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    if(!account)
    {
        return res.json({
            message: "User balance doesnt exists"
        })
    }
    return res.json({
        balance: account.balance
    });
});

accRouter.post("/transfer", authMiddleware , async(req,res) => {
    // starting the transaction session before the algorithm
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    const account = await Account.findOne({userId: req.userId }).session(session);
    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance or the account doesnt exist"
        });
    }
    const toAccount = await Account.findOne({userId:to}).session(session);
    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        });
    }
    // performing the transfer
    await Account.updateOne({userId:req.userId}, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({userId:to},{ $inc: { balance: amount } }).session(session);
    // commit the transfer 
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

});

export {accRouter};