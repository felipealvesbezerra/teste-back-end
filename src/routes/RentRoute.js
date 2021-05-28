const express = require('express')
const router = express.Router()
const RentController = require('../controllers/RentController')

/**
 * @swagger
 * components:
 *   schemas:
 *     Rent:
 *       type: object
 *       required:
 *         - plate
 *         - model
 *         - manufacturer
 *         - year
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the rent
 *         name:
 *           type: string
 *           description: The name of rent
 *         initial_date:
 *           type: date
 *           description: The initial_date of rent | FORMAT MM/DD/YYYY
 *         final_date:
 *           type: date
 *           description: The Last final_date of rent | FORMAT MM/DD/YYYY
 *         customer_id:
 *           type: string
 *           description: The customer_id of the rent
 *         car_id:
 *           type: string
 *           description: The car_id of the rent
 *       example:
 *         id: 1
 *         name: 'My First rent'
 *         initial_date: '05/27/2021'
 *         final_date: '05/28/2021'
 *         createdAt: '2021-05-27T20:21:17.998Z'
 *         updatedAt: '2021-05-27T20:27:31.701Z'
 *         customer_id: 1
 *         car_id: 1
 */   

 /**
  * @swagger
  * tags:
  *   name: Rents
  *   description: The Rents managing API
  */

/**
 * @swagger
 * /customers/{customer_id}/rents:
 *   get:
 *     summary: Returns the list of the Rents of the customer by id
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The list of the Rents of the customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rent'
 *       404:
 *         description: Customer not found.
 */

router.get('/:customer_id/rents', RentController.index)

/**
 * @swagger
 * /customers/{customer_id}/rents/{car_id}:
 *   post:
 *     summary: Create a new rent
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *       - in: path
 *         name: car_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rent'
 *           example:
 *             name: 'My First rent'
 *             initial_date: '05/27/2021'
 *             final_date: '05/28/2021'
 *     responses:
 *       201:
 *         description: The created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       400:
 *         description: Some database error.
 *       404:
 *         description: Customer or car not found. 
 */
router.post('/:customer_id/rents/:car_id', RentController.store)

/**
 * @swagger
 * /customers/rents/{id}:
 *   get:
 *     summary: Get the rent by id
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rent id
 *     responses:
 *       200:
 *         description: The rent description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 *       404:
 *         description: Rent not found.
 */
router.get('/rents/:id', RentController.show)

/**
 * @swagger
 * /customers/rents/{id}:
 *  put:
 *    summary: Update the Rent by id
 *    tags: [Rents]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The rent id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Rent'
 *          example:
 *            name: 'My First rent'
 *            initial_date: '05/27/2021'
 *            final_date: '05/28/2021'
 *    responses:
 *      200:
 *        description: The altered rent
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rent'
 *      404:
 *        description: Rent not found.
 *      400:
 *        description: Some database error.
 */
router.put('/rents/:id', RentController.update)

/**
 * @swagger
 * /customers/rents/{id}:
 *   delete:
 *     summary: Remove the rent by id
 *     tags: [Rents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rent id
 * 
 *     responses:
 *       200:
 *         description: The deleted rent.
 *       400:
 *         description: Some database error.
 *       404:
 *         description: Rent not found.
 */
router.delete('/rents/:id', RentController.destroy)


module.exports = router