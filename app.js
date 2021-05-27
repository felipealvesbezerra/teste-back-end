// MODULES
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();

// APP
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

// ROUTER
import userRouter from "./src/routes/user.js";
app.use("/user", userRouter);

// MONGOOSE
try {
  await mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.info("database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}

// LISTEN
try {
  app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
