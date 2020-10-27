import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email?: string;
  id?: string;
}

@injectable()
export default class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, id }: IRequest): Promise<User | undefined> {
    if (id) {
      const user = await this.usersRepository.findById(id);
      return user;
    }
    if (email) {
      const user = await this.usersRepository.findByEmail(email);
      return user;
    }
    throw new AppError('E-mail ou Id não especifíados.', 400);
  }
}
