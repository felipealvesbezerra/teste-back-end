"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProductController = _interopRequireDefault(require("../controllers/ProductController"));

var _ProductPriceController = _interopRequireDefault(require("../controllers/ProductPriceController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsRouter = (0, _express.Router)();
const productController = new _ProductController.default();
const productPriceController = new _ProductPriceController.default();
productsRouter.use(_ensureAuthenticated.default);
productsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required()
  }
}), productController.create);
productsRouter.delete('/id/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), productController.delete);
productsRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    page: _celebrate.Joi.number().default(1),
    take: _celebrate.Joi.number().default(5)
  }
}), productController.all);
productsRouter.patch('/price', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    newPrice: _celebrate.Joi.number().required()
  }
}), productPriceController.edit);
var _default = productsRouter;
exports.default = _default;