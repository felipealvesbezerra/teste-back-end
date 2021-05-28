const express = require('express')
const router = express.Router()
const CarController = require('../controllers//CarController')


/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - plate
 *         - model
 *         - manufacturer
 *         - year
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the car
 *         plate:
 *           type: string
 *           description: The Plate of car
 *         color:
 *           type: string
 *           description: The color of car
 *         model:
 *           type: string
 *           description: The Last model of car
 *         manufacturer:
 *           type: string
 *           description: The manufacturer of car
 *         year:
 *           type: string
 *           description: The year of car
 *         daily:
 *           type: string
 *           description: The daily of car
 *       example:
 *         id: 1
 *         plate: 'AHR-4785'
 *         color: 'white'
 *         model: 'HB20'
 *         manufacturer: 'Hyundai'
 *         year: '2020'
 *         daily: '90'
 *         createdAt: '2021-05-27T20:21:17.998Z'
 *         updatedAt: '2021-05-27T20:27:31.701Z'
 */   

 /**
  * @swagger
  * tags:
  *   name: Cars
  *   description: The Cars managing API
  */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Returns the list of all the cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: The list of the cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

router.get('/', CarController.index)


/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Insert a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *           example:
 *             plate: 'AHR-4785'
 *             color: 'white'
 *             model: 'HB20'
 *             manufacturer: 'Hyundai'
 *             year: '2020'
 *             daily: '90'
 *     responses:
 *       201:
 *         description: The Inserted car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Some database error.
 */

router.post('/', CarController.store)
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get the car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
router.get('/:id', CarController.show)

/**
 * @swagger
 * /cars/{id}:
 *  put:
 *    summary: Update the car by id
 *    tags: [Cars]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The car id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *        description: The altered car
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Car'
 *            example:
 *              plate: 'AHR-4785'
 *              color: 'white'
 *              model: 'HB20'
 *              manufacturer: 'Hyundai'
 *              year: '2020'
 *              daily: '90'
 *      404:
 *        description: Car not found.
 *      400:
 *        description: Some database error.
 */

router.put('/:id', CarController.update)


/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Remove the car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car id
 * 
 *     responses:
 *       200:
 *         description: The deleted car.
 *       400:
 *         description: Some database error.
 *       404:
 *         description: Car not found.
 */

router.delete('/:id', CarController.destroy)


module.exports = router