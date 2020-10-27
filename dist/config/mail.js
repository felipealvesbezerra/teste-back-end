"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'nao-responda@dominio.com.br',
      name: 'EQUIPE | SIGLA'
    }
  }
};
var _default = mailConfig;
exports.default = _default;