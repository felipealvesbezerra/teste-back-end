"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _products = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/products.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/products', _products.default);
routes.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello World!'
  });
});
var _default = routes;
exports.default = _default;