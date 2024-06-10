import express from "express";
import {apiRouter} from "../backend/routes/index.js";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
app.use(cors({
    credentials:true
}));

app.use(express.json({limit:"16kb"}));


app.use("/api/v1",apiRouter);

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
});