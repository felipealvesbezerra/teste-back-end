/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string' },
    brand: { type: 'string', required: true },
    model: { type: 'string', required: true },
    price: { type: 'number', required: true },
    category: { type: 'string' },
    subcategory: { type: 'string' },
    imageUrl: { type: 'string' },
    qty: { type: 'number', required: true },
    store: { type: 'string' }
  }
};

