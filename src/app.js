import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";

import apiSchema from "./api.schema.json";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.docsSetup();
  }

  middlewares() {
    this.server.use(express.json());
  }
  
  docsSetup() {
    this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSchema));
  }

  routes() {
    this.server.use(routes);
  }

}

export default new App().server;
