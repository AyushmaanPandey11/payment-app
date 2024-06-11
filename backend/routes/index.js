import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { accRouter } from "./account.js";

const apiRouter = Router();
apiRouter.use("/user",userRouter);
apiRouter.use("/account",accRouter);


export {apiRouter}; 
