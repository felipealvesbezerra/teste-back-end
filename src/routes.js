import { Router } from "express";
const routes = new Router();

import books from "./app/controllers/BooksController";

// BOOKS
/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *        - title
 *        - subtitle
 *        - content
 *        - category
 *        - author
 *        - gender
 *        - pages
 *        - link
 *        - isbn
 *        - year
 *      properties:
 *        id:
 *           type: string
 *           description: The auto-generated id of book
 *        title:
 *           type: string
 *           description: The book title
 *        subtitle:
 *           type: string
 *           description: The book subtitle
 *        content:
 *           type: string
 *           description: The book content
 *        category:
 *           type: string
 *           description: The book category
 *        author:
 *           type: string
 *           description: The book author
 *        gender:
 *           type: string
 *           description: The book gender
 *        pages:
 *           type: string
 *           description: The book pages
 *        link:
 *           type: string
 *           description: The book link
 *        isbn:
 *           type: string
 *           description: The book isbn
 *        year:
 *           type: string
 *           description: The book year
 *      example:
 *        id: 60ada27472466f23e82bc75b
 *        title: Desconstruindo a Web
 *        subtitle: As tecnologias por trás de uma requisição
 *        content: Desde o momento em que o usuário aperta a tecla Enter do teclado até a página aparecer completamente carregada na tela, ocorre uma série de eventos. Como o navegador faz a chamada? Como a requisição sai do sistema operacional e chega ao servidor de destino? Como o HTTPS funciona? Como o servidor de aplicação se integra ao framework de desenvolvimento web?
 *        category: development
 *        author: Willian Molinari
 *        gender: Education
 *        pages: 255
 *        link: https://www.casadocodigo.com.br/products/livro-desconstruindo-web
 *        isbn: 978-85-5519-210-4
 *        year: 2018
 *
 **/

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
  * @swagger
 * /books
 *  get:
 *      sumarry: Returns the list of all books
 *      responses:
 *              200:
 *
 **/

routes.get("/books", books.index);
routes.get("/books/:id", books.verifyId, books.show);
routes.post("/books", books.create);
routes.put("/books/:id", books.update);
routes.delete("/books/:id", books.verifyId, books.destroy);

export default routes;
