const { Router } = require('express');

const Telefone = require('../app/controller/TelefoneController');

const routes = Router();

// CRUD de Telefone (Usuário)
routes.route('/telefone/:id')
      .post(Telefone.register)
      .get(Telefone.listFilterByUser)
      .put(Telefone.update)
      .delete(Telefone.delete);

// Listagem de Todos os Telefones, sem Filtros
routes.route('/telefone').get(Telefone.listAll);

module.exports = routes;