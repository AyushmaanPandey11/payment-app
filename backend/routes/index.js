import { Router } from "express";
import { userRouter } from "./userRouter";

const apiRouter = Router();

apiRouter.route("/user",userRouter);
 


export {apiRouter}; 
