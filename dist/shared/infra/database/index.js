"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (name = 'default') => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();

  try {
    const connection = await (0, _typeorm.createConnection)(defaultOptions);
    console.log('A conexão com o banco de dados foi estabilizada!');
    console.log('Rodando Migrações');
    connection.runMigrations().then(() => {
      console.log('Migrações Realizadas, banco de dados atualizado!');
    });
    return connection;
  } catch (error) {
    console.log('Ocorreu um erro ao estabilizar a conexão com o banco de dados!');
    console.log(error);
  }
};

exports.default = _default;