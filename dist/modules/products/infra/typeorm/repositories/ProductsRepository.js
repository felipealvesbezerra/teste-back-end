"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Product = _interopRequireDefault(require("../entities/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Product.default);
  }

  async findByName(name) {
    const product = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return product;
  }

  async deleteById(id) {
    const product = await this.ormRepository.findOne(id);

    if (!product) {
      return;
    }

    await this.ormRepository.delete(product);
  }

  async findByPage({
    page,
    take
  }) {
    const [products, totalResults] = await this.ormRepository.findAndCount({
      skip: (page - 1) * take,
      take
    });
    return {
      result: products,
      currentPage: page,
      pages: Math.ceil(totalResults / take),
      totalResults
    };
  }

  async findByEmail(email) {
    const findEmail = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return findEmail;
  }

  async create(userData) {
    const product = this.ormRepository.create(userData);
    await this.ormRepository.save(product);
    return product;
  }

  async findById(id) {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  async save(product) {
    const savedUser = await this.ormRepository.save(product);
    return savedUser;
  }

}

exports.default = ProductsRepository;