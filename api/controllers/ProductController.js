/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: async function (req, res) {

    const products = await ProductService.getAll();

    return res.send({
      success: true,
      data: products
    });

  },

  show: async function (req, res) {

    try {

      const id = req.param('id');

      if (!await ProductService.exist(id)) {
        throw 'Product id not found';
      }

      const product = await ProductService.getById(id);

      return res.send({
        success: true,
        data: product
      });

    } catch (error) {

      return res.badRequest(error);

    }

  },

  store: async function (req, res) {

    try {

      ProductService.validate(req.body);

      const data = await sails.helpers.getObjectData(req.body, [
        'name',
        'description',
        'brand',
        'model',
        'price',
        'category',
        'subcategory',
        'imageUrl',
        'qty',
        'store'
      ]);

      const product = await ProductService.create(data);

      return res.send({
        success: true,
        message: 'Produto cadastrado com sucesso',
        data: product
      });

    } catch (error) {

      return res.badRequest(error);

    }

  },

  update: async function (req, res) {

    try {

      ProductService.validate(req.body);

      const id = req.param('id');

      if (!await ProductService.exist(id)) {
        throw 'Product id not found';
      }

      const data = await sails.helpers.getObjectData(req.body, [
        'name',
        'description',
        'brand',
        'model',
        'price',
        'category',
        'subcategory',
        'imageUrl',
        'qty',
        'store'
      ]);

      const product = await ProductService.update(id, data);

      return res.send({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: product
      });

    } catch (error) {

      return res.badRequest(error);

    }

  },

  delete: async function (req, res) {

    try {

      const id = req.param('id');

      if (!await ProductService.exist(id)) {
        throw 'Product id not found';
      }

      const product = await ProductService.delete(id);

      return res.send({
        success: true,
        message: 'Produto excluído com sucesso',
        data: product
      });

    } catch (error) {

      return res.badRequest(error);

    }

  }

};

