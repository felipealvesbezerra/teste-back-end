import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '../controllers/UserController';
import VerifyUserController from '../controllers/VerifyUserController';

const usersRouter = Router();
const userController = new UserController();
const verifyUserController = new VerifyUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.post(
  '/verify',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required().uuid(),
    },
  }),
  verifyUserController.create,
);

export default usersRouter;
