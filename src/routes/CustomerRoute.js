const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/CustomerController')


/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - cnh
 *         - cpf
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the customer
 *         name:
 *           type: string
 *           description: The Name of customer
 *         email:
 *           type: string
 *           description: The Email of customer
 *         cnh:
 *           type: string
 *           description: The Last name of customer
 *         cpf:
 *           type: string
 *           description: The CPF of customer
 *         phone:
 *           type: string
 *           description: The phone of customer
 *         birth_date:
 *           type: string
 *           description: The Birth date of customer
 *         profession:
 *           type: string
 *           description: The profession of customer
 *         address:
 *           type: string
 *           description: The address of customer
 *         zip:
 *           type: string
 *           description: The zip code of customer
 *         city:
 *           type: string
 *           description: The city of customer
 *         state:
 *           type: string
 *           description: The state of customer
 *       example:
 *         id: 1
 *         name: 'John Doe'
 *         email: 'email@email.com'
 *         cpf: '00000000000'
 *         cnh: '00000000000'
 *         phone: '000000000'
 *         birth_date: '01/01/1990'
 *         profession: 'Desenvolvedor'
 *         address: 'street etc'
 *         zip: '000000'
 *         city: 'são Paulo'
 *         state: 'São Paulo'
 *         createdAt: '2021-05-27T20:21:17.998Z'
 *         updatedAt: '2021-05-27T20:27:31.701Z'
 */   

 /**
  * @swagger
  * tags:
  *   name: Customers
  *   description: The Customers managing API
  */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Returns the list of all the customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */


router.get('/', CustomerController.index)
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 */
router.get('/:id', CustomerController.show)

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Insert a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: The Inserted customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Some database error.
 *       500:
 *         description: Some server error
 */

router.post('/', CustomerController.store)

/**
 * @swagger
 * /customers/{id}:
 *  put:
 *    summary: Update the customer by id
 *    tags: [Customers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The customer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *          example:
 *            name: 'John Doe'
 *            email: 'email@email.com'
 *            cpf: '00000000000'
 *            cnh: '00000000000'
 *            phone: '000000000'
 *            birth_date: '01/01/1990'
 *            profession: 'Desenvolvedor'
 *            address: 'street etc'
 *            zip: '000000'
 *            city: 'são Paulo'
 *            state: 'São Paulo'
 *    responses:
 *      200:
 *        description: The altered customer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      404:
 *        description: Customer not found.
 *      400:
 *        description: Some database error.
 */
router.put('/:id', CustomerController.update)


/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Remove the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 * 
 *     responses:
 *       200:
 *         description: The deleted customer.
 *       400:
 *         description: Some database error.
 *       404:
 *         description: Customer not found.
 */

router.delete('/:id', CustomerController.destroy)


module.exports = router