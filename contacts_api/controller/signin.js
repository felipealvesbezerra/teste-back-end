const User = require("../models/user");
var jwt = require("jsonwebtoken");
const { comparePassword } = require("../controller/encrypt");

const signinController = async (form) => {
  try {
    const checkUser = await User.findOne({ email: form.email });
    const compare = await comparePassword(form.password, checkUser.password);

    if (compare) {
      const signToken = jwt.sign({ email: form.email }, "shhhhh", {
        expiresIn: "10d",
      });
      return signToken;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

module.exports = {
  signinController: signinController,
};
