const { Router } = require('express');

const usuario = require('./usuario');
const telefone = require('./telefone');

const routes = Router();

routes.use(usuario);
routes.use(telefone);

module.exports = routes;