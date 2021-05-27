const express = require("express");
const useragent = require("express-useragent");
const cors = require("cors");

module.exports = new class App {
  constructor() {
    this.app = express();
    this.middlewares();
  }
  middlewares() {
    this.app.use(useragent.express());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
}
