import { Router } from "express";
const routes = new Router();


import books from "./app/controllers/BooksController";

// BOOKS
routes.get("/books", books.index);
routes.get("/books/:id", books.show);
routes.post("/books", books.create);
routes.put("/books/:id", books.update);
routes.delete("/books/:id", books.destroy);

export default routes;