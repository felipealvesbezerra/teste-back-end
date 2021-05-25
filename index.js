// MODULES
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();

// APP
const app = express();
const PORT = process.env.PORT;

// MONGOOSE
try {
  await mongoose.connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
} catch (error) {
  console.log(error);
}

// LISTEN
app.listen(PORT, () => {
  console.log(`server running at localhost:${PORT}`);
});