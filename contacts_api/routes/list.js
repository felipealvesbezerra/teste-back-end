const express = require("express");
const router = express.Router();

const { listContactsDB, listContactsNameDB } = require("../controller/list");

router.get("/list", async (req, res) => {
  const contacts = await listContactsDB();
  res.status(200).json(contacts);
});

router.get("/list/:name", async (req, res) => {
  const contacts = await listContactsNameDB(req);
  res.status(200).json(contacts);
});

module.exports = router;
