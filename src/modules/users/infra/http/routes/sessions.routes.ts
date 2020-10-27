import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/', ensureAuthenticated, sessionsController.getSession);

export default sessionsRouter;
