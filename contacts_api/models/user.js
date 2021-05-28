const mongoose = require("mongoose");

const UserSchemma = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchemma);

module.exports = User;
