import express from "express";
import {apiRouter} from "../backend/routes/index.js";
import cors from "cors";

const app = express();
app.use(cors({
    credentials:true
}));

app.use(express.json({limit:"16kb"}));


app.use("/api/v1",apiRouter);

app.listen(3000);