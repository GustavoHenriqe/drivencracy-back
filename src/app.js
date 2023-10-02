import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routes/indexRouters.js";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers);

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
    console.log(`Running server in port: ${PORT}`);
});