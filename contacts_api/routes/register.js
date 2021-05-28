const express = require("express");
const router = express.Router();
const { encryptPassword } = require("../controller/encrypt");
const { registerController } = require("../controller/register");
const { checkLogin } = require("../middleware/checkBody");

router.post("/register", checkLogin, async (req, res) => {
  const { name, email, password } = req.body;
  const encrypt = await encryptPassword(password);
  const form = {
    name: name,
    email: email,
    password: encrypt,
  };

  if (form) {
    const response = await registerController(form);
    if (response) {
      res.status(200).json({ message: "success", token: response });
    } else {
      res.status(400).json({ error: " email already registered" });
    }
  }
});

module.exports = router;
