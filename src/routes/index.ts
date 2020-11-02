import { Router } from 'express';

import UserController from '../controllers/UserController';

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.createUser);
routes.put('/users/:_id', UserController.updateUser);
routes.delete('/users/:_id', UserController.deleteUser);

export default routes;
