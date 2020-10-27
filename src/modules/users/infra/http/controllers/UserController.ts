import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      firstName,
      email,
      lastName,
      password,
    });

    return res.status(201).json(user);
  }
}
