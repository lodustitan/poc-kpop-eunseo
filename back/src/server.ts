import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import marketRoute from "./routes/market.route"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/market", marketRoute);

const PORT = process.env.PORT; 

app.listen(PORT, async () => {
    console.log(`Server Express.js running on port: ${PORT}`);
});