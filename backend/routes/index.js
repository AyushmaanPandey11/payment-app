import { Router } from "express";
import { userRouter } from "./userRouter";
import { accRouter } from "./account";

const apiRouter = Router();

apiRouter.route("/user",userRouter);
apiRouter.route("/account",accRouter);


export {apiRouter}; 
