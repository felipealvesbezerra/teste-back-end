import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userEmailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExist) {
      throw new AppError('Endereço de E-Mail já utilizado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const verifyAccountTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'verify_account.hbs',
    );

    this.mailProvider.sendMail({
      to: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      subject: '[SIGLA] Bem Vindo! ',
      templateData: {
        file: verifyAccountTemplate,
        variables: {
          name: user.firstName,
          link: `${process.env.APP_URL}/verify?id=${user.id}`,
        },
      },
    });

    return user;
  }
}

export default CreateUserService;
