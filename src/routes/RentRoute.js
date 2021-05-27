const express = require('express')
const router = express.Router()
const RentController = require('../controllers/RentController')

router.post('/:customer_id/rents/:car_id', RentController.store)

router.get('/:customer_id/rents', RentController.index)
router.get('/rents/:id', RentController.show)
router.patch('/rents/:id', RentController.update)
router.delete('/rents/:id', RentController.destroy)


module.exports = router