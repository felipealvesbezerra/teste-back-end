require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const db = require("./config/mongo");
const cors = require("cors");
var morgan = require("morgan");

const listRoute = require("./routes/list");
const registerRoute = require("./routes/register");
const signinRoute = require("./routes/signin");
const contactRoute = require("./routes/contact");

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// routes  

app.get("/", async (req, res) => {
  res.status(200).json("contacts api");
});

app.use(listRoute);

app.use(registerRoute);

app.use(signinRoute);

app.use(contactRoute);

const port = 3000;
app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
