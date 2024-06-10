import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { accRouter } from "./account.js";

const apiRouter = Router();

apiRouter.route("/user",userRouter);
apiRouter.route("/account",accRouter);


export {apiRouter}; 
