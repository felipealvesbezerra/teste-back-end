import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import GetSessionsService from '@modules/users/services/GetSessionsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const autheticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await autheticateUser.execute({ email, password });

    return res.status(200).json({ user: classToClass(user), token });
  }

  public async getSession(req: Request, res: Response): Promise<Response> {
    const getSessions = container.resolve(GetSessionsService);
    const { id } = req.user;

    const user = await getSessions.execute({ userId: id });
    return res.status(200).json({ user: classToClass(user) });
  }
}
