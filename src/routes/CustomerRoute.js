const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/CustomerController')

router.get('/', CustomerController.index)
router.post('/', CustomerController.store)
router.get('/:id', CustomerController.show)
router.put('/:id', CustomerController.update)
router.delete('/:id', CustomerController.destroy)


module.exports = router