import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Combinação de e-mail e senha incorretos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de e-mail e senha incorretos.', 401);
    }

    if (!user.verify) {
      throw new AppError(
        'O usuário ainda não foi ativado, verifique seu e-mail.',
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      { message: 'Desenvolvido por Cleidson Oliveira' },
      secret as string,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}
