const { Router } = require('express');

const Usuario = require('../app/controller/UsuarioController');

const routes = Router();

// CRUD de Usuário
routes.route('/usuario')
      .post(Usuario.register)
      .get(Usuario.listAll);

routes.route('/usuario/:id')
      .put(Usuario.update);

routes.route('/usuario/:id')
      .delete(Usuario.delete);

// Listagem Única e com Filtro (Status do Usuário)
routes.route('/usuario/:id')
      .get(Usuario.listOne);

routes.route('/usuario/filtro/:status')
      .get(Usuario.listFilterByStatus);

module.exports = routes;