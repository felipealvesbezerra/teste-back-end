import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;
let authenticateUser: AuthenticateUserService;
let fakeMailProvider: IMailProvider;
let createUser: CreateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeMailProvider,
    );
  });
  it('should be able to authenticate user', async () => {
    const user = await createUser.execute({
      email: 'email@email.com',
      firstName: 'Joe',
      lastName: 'Doe',
      password: '333',
    });

    user.verify = true;
    await fakeUsersRepository.save(user);

    const response = await authenticateUser.execute({
      email: 'email@email.com',
      password: '333',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate a user not verified', async () => {
    await createUser.execute({
      email: 'email@email.com',
      firstName: 'Joe',
      lastName: 'Doe',
      password: '333',
    });

    await expect(
      authenticateUser.execute({
        email: 'email@email.com',
        password: '333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'not@existing.com',
        password: '808',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    await createUser.execute({
      email: 'email@email.com',
      firstName: 'Joe',
      lastName: 'Doe',
      password: '333',
    });

    await expect(
      authenticateUser.execute({
        email: 'email@email.com',
        password: '444',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
