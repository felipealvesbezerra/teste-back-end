import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductController from '../controllers/ProductController';
import ProductPriceController from '../controllers/ProductPriceController';

const productsRouter = Router();
const productController = new ProductController();
const productPriceController = new ProductPriceController();

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  productController.create,
);

productsRouter.delete(
  '/id/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productController.delete,
);

productsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().default(1),
      take: Joi.number().default(5),
    },
  }),
  productController.all,
);

productsRouter.patch(
  '/price',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      newPrice: Joi.number().required(),
    },
  }),
  productPriceController.edit,
);

export default productsRouter;
