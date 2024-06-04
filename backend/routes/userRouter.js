import { Router } from "express";
import zod from "zod";
import { User } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const userRouter = Router();


const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

userRouter.post("/signup", async (req,res)=> {
    const body = req.body;
    const {success} = signupBody.safeParse(body); 
    if(!success)
    {
        return res.status(411).json({
            message: "Email Already taken/ Incorrect inputs"
        });
    }
    const user = await User.findOne({
        username: body.username
    });
    if(user._id)
    {
        return res.status(411).json({
            message: "Email already taken"
        });
    }
    const createdUser = await User.create(body);
    const token = jwt.sign({
        userId: createdUser._id,
    },JWT_SECRET);
    res.status(200).json({
        message: "User Created Successfully",
        token: token
    });
});
 


export {userRouter}; 
