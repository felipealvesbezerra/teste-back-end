const routes = require('express').Router()

const UsersController = require('./controllers/UsersController')

routes.get('/users/get', UsersController.getAllUsers)
routes.get('/users/get/:id', UsersController.getUserById)
routes.post('/users/new', UsersController.newUser)
routes.put('/users/update', UsersController.updateUser)
routes.delete('/users/delete/:id', UsersController.deleteUser)

module.exports = routes