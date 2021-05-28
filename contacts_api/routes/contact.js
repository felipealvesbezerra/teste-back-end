const express = require("express");

const router = express.Router();
const {
  addContact,
  readContact,
  updateContact,
  deleteContact,
} = require("../controller/contact");

const auth = require("../middleware/auth");

// post
router.post("/contact", auth, async (req, res) => {
  const form = req.body.form;
  try {
    const contact = await addContact(form);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// get
router.get("/contact", async (req, res) => {
  const email = req.body.email;
  try {
    const contact = await readContact(email);

    if (contact === null) {
      res.status(400).json({ error: "contact not found!" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// patch
router.patch("/contact/update/:email", auth, async (req, res) => {
  const email = req.params.email;
  const form = req.body.form;
  const contact = await updateContact(email, form);

  try {
    if (contact === null) {
      res.status(400).json({ error: "user not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(400).json({ error: "user not found" });
  }
});

// delete
router.delete("/contact/delete/:email", auth, async (req, res) => {
  const email = req.params.email;
  try {
    const contact = await deleteContact(email);
    if (contact === null) {
      res.status(400).json({ error: "contact not found" });
    } else {
      res.status(200).json({ message: "deleted with success" });
    }
  } catch (error) {
    res.status(400).json({ error: "user not found" });
  }
});

module.exports = router;
