const express = require('express')
const router = express.Router()

const userController = require('../../api/controller/user.controller')

router.get('/', userController.getAll)
router.post('/', userController.create)
router.put('/:id', userController.alter)
router.delete('/:id', userController.delete)

module.exports = router
