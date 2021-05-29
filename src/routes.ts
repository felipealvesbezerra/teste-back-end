import { Router } from 'express';
import { UsersController } from './controllers/users.controller';

const router = Router();
const usersController = new UsersController();

router.get('/users', usersController.index);
router.get('/users/:email', usersController.show);
router.post('/users', usersController.create);
router.put('/users', usersController.update);
router.delete('/users', usersController.delete);

export { router };
