module.exports = {

  validate: function (data) {

    const errors = [];

    if (data.name == undefined || data.name == '') {
      errors.push('name is required');
    }

    if (data.brand == undefined || data.brand == '') {
      errors.push('brand is required');
    }

    if (data.model == undefined || data.model == '') {
      errors.push('model is required');
    }

    if (data.price == undefined || data.price == '') {
      errors.push('price is required');
    }

    if (data.price != undefined && isNaN(data.price)) {
      errors.push('price is not a number');
    }

    if (data.qty == undefined || data.qty == '') {
      errors.push('qty is required');
    }

    if (data.qty != undefined && isNaN(data.qty)) {
      errors.push('qty is not a number');
    }

    if (errors.length == 0) return true;

    throw { errors: errors };

  },

  exist: async function (id) {
    return await Product.count({ id: id }) > 0;
  },

  getAll: async function () {
    return await Product.find();
  },

  getById: async function (id) {
    return await Product.findOne({ id: id });
  },

  create: async function (data) {
    return await Product.create(data).fetch();
  },

  update: async function (id, data) {
    return await Product.updateOne({ id: id }).set(data);
  },

  delete: async function (id) {
    return await Product.destroyOne({ id: id });
  }

}
