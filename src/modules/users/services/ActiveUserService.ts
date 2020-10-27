/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ActiveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuario não existe.', 404);
    }

    if (user.verify) {
      throw new AppError('O Usuario já está ativo.', 406);
    }

    user.verify = true;
    await this.usersRepository.save(user);

    return user;
  }
}
