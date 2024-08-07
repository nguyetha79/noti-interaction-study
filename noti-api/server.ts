import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./route";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 6001;

app.use(cors());

// Parse JSON requests
app.use(express.json());

app.use("/", router);

/* mongoose setup */
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
