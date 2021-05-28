const express = require("express");
const router = express.Router();
const { signinController } = require("../controller/signin");
const { checkLogin } = require("../middleware/checkBody");

router.post("/signin", checkLogin, async (req, res) => {
  const form = req.body;
  if (form.email && form.password) {
    try {
      const signin = await signinController(form);
      if (signin) {
        res.status(200).json({ message: "success", token: signin });
      } else {
        res.status(400).json({ error: "email or password  incorrect" });
      }
    } catch (err) {
      res.status(400).json({ error: "email not found" });
    }
  }
});

module.exports = router;
