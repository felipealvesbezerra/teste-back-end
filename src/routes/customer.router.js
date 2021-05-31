const express = require('express');
const routes = express.Router();

const customerController = require('../controllers/customer.controller');

routes.get('/', customerController.index);
routes.get('/:id', customerController.show);
routes.post('/', customerController.store);
routes.put('/:id', customerController.update);
routes.delete('/:id', customerController.delete);

module.exports = routes;