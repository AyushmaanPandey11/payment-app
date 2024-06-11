import { Router } from "express";
import zod from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware.js";
import bcrypt from "bcrypt";


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
    if(user?._id)
    {
        return res.status(411).json({
            message: "Email already taken"
        });
    }
    const createdUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = createdUser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({
        userId:  createdUser._id,
    },JWT_SECRET);
    res.status(200).json({
        message: "User Created Successfully",
        token: token
    });
});


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

userRouter.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid User input for signing in",
            error: error.errors
        });
    }
    const user = await User.findOne({ 
        username: req.body.username
    });
    if (user) {
        const isPasswordValid =  await bcrypt.compare(req.body.password,user.password);
        console.log(isPasswordValid);
        if (isPasswordValid) {
            const token = jwt.sign({
                userId: user._id,
            }, JWT_SECRET);
            return res.json({
                message: "Logged in Successfully",
                token: token
            });
        } else {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
    } else {
        return res.status(401).json({
            message: "Invalid Username or password"
        });
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

userRouter.put("/",authMiddleware, async (req,res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success)
    {
        return res.status(403).json({
            message: "Error while updating the information"
        });   
    }
    const updatedUser = await  User.updateOne(req.body,{
        _id : req.userId
    });
    if(updatedUser)
    {
        return res.status(200).json({
            message: "updated succesfully"
        });    
    }
});

userRouter.get("/bulk",authMiddleware,async(req,res)=> {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex" : filter
            }
        },{
            lastName: {
                "$regex" : filter
            }
        }]
    });
    res.json({
        message: "Fetched successfully",
        users: users.map((user)=> ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


export {userRouter} ; 
