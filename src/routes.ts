import {Router} from 'express';
import UserController from './controllers/UserController';

const route = Router();

route.post('/users', UserController.store);
route.get('/users', UserController.index);
route.get('/user/:id', UserController.show);
route.put('/user/:id', UserController.update);
route.delete('/user/:id', UserController.delete);

export default route;