// MODULES
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();

// APP
const app = express();

// MONGOOSE
try {
  await mongoose.connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}

export default app;