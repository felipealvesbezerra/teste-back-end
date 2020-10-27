"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

class FakeProductsRepository {
  constructor() {
    this.products = [];
  }

  async save(product) {
    const productIndex = this.products.findIndex(find => find.id === product.id);

    if (productIndex === -1) {
      this.products.push(product);
      return { ...product
      };
    }

    this.products[productIndex] = product;
    return { ...product
    };
  }

  async findById(id) {
    const product = this.products.find(find => find.id === id);
    return product ? { ...product
    } : undefined;
  }

  async findByName(name) {
    const product = this.products.find(find => find.name === name);
    return product ? { ...product
    } : undefined;
  }

  async create(data) {
    const product = {
      id: (0, _uuid.v4)()
    };
    Object.assign(product, data);
    this.products.push(product);
    return { ...product
    };
  }

  async deleteById(id) {
    const productIndex = this.products.findIndex(find => find.id === id);

    if (productIndex === -1) {
      return;
    }

    this.products.splice(productIndex, 1);
  }

  async findByPage({
    page,
    take
  }) {
    const products = this.products.slice(take * (page - 1), take);
    return {
      currentPage: page,
      pages: Math.ceil(this.products.length / take),
      result: [...products],
      totalResults: this.products.length
    };
  }

}

exports.default = FakeProductsRepository;