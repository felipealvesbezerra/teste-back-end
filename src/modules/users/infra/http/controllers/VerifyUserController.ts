import ActiveUserService from '@modules/users/services/ActiveUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class VerifyUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const activeUser = container.resolve(ActiveUserService);

    await activeUser.execute({ userId: id });

    return response.status(204).json({});
  }
}
