"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));

var _DeleteProductService = _interopRequireDefault(require("../../../services/DeleteProductService"));

var _FindProductsPageable = _interopRequireDefault(require("../../../services/FindProductsPageable"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductController {
  async create(req, res) {
    const {
      name,
      price
    } = req.body;

    const createProduct = _tsyringe.container.resolve(_CreateProductService.default);

    const product = await createProduct.execute({
      name,
      price
    });
    return res.status(201).json((0, _classTransformer.classToClass)(product));
  }

  async delete(req, res) {
    const {
      id
    } = req.params;

    const deleteProduct = _tsyringe.container.resolve(_DeleteProductService.default);

    await deleteProduct.execute(id);
    return res.status(204).json();
  }

  async all(req, res) {
    const {
      take,
      page
    } = req.query;

    const findPageable = _tsyringe.container.resolve(_FindProductsPageable.default);

    const takeNumber = take;
    const pageNumber = page;
    const products = await findPageable.execute({
      take: takeNumber,
      page: pageNumber
    });
    return res.status(200).json(products);
  }

}

exports.default = ProductController;