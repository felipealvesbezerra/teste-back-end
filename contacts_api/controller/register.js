const User = require("../models/user");
var jwt = require("jsonwebtoken");

const registerController = async (form) => {
  const user = new User(form);

  try {
    const register = await user.save();
    const signToken = jwt.sign({ email: form.email }, "shhhhh", {
      expiresIn: "24h",
    });
    return signToken;
  } catch (error) {
    return false;
  }
};

module.exports = {
  registerController: registerController,
};
