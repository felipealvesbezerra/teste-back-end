"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EditProductPrice = _interopRequireDefault(require("../../../services/EditProductPrice"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductPriceController {
  async edit(req, res) {
    const {
      id,
      newPrice
    } = req.body;

    const editProductPrice = _tsyringe.container.resolve(_EditProductPrice.default);

    const product = await editProductPrice.execute({
      productId: id,
      newPrice
    });
    return res.status(200).json((0, _classTransformer.classToClass)(product));
  }

}

exports.default = ProductPriceController;