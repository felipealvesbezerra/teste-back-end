const express = require('express')
const router = express.Router()
const CarController = require('../controllers//CarController')

router.get('/', CarController.index)
router.post('/', CarController.store)
router.get('/:id', CarController.show)
router.put('/:id', CarController.update)
router.delete('/:id', CarController.destroy)


module.exports = router