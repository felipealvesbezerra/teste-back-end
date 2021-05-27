import mongoose from "mongoose";
import dotenv from "dotenv"; dotenv.config();

const MONGOURI = process.env.MONGOURI;

try {
  await mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}
