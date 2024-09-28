/*
Author: AsibHasanRiyad
Date: May 21, 2024
Title of program/source code: A Comprehensive Guide to Setting Up a TypeScript, Mongoose, and Express Backend Project
Type: source code
Web address or publisher: https://medium.com/@asibhasanriyad/a-comprehensive-guide-to-setting-up-a-typescript-mongoose-and-express-backend-project-8f1a1f281efb
*/

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
