import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let usersRepository: IUsersRepository;
let createUserService: CreateUserService;
let hashProvider: IHashProvider;
let fakeMailProvider: IMailProvider;

describe('User Service Test', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
      fakeMailProvider,
    );
  });

  test('It should test execute user service', async () => {
    const userToCreate = {
      firstName: 'Test',
      lastName: 'User',
      email: uuid().slice(0, 4),
      password: uuid().slice(0, 5),
      phoneNumber: uuid().slice(0, 5),
    };

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await createUserService.execute(userToCreate);
    expect(user).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  test('It should encrypt the password', async () => {
    const userToCreate = {
      firstName: 'Test',
      lastName: 'User',
      email: uuid().slice(0, 4),
      password: uuid().slice(0, 5),
      phoneNumber: uuid().slice(0, 5),
    };

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await createUserService.execute(userToCreate);

    expect(generateHash).toBeCalled();
  });

  test('It should create a user with verify false ', async () => {
    const userToCreate = {
      firstName: 'Test',
      lastName: 'User',
      email: uuid().slice(0, 4),
      password: uuid().slice(0, 5),
      phoneNumber: uuid().slice(0, 5),
    };

    const user = await createUserService.execute(userToCreate);

    expect(user.verify).toEqual(false);
  });

  test('It should not create a user with duplicate email', async () => {
    const userToCreate = {
      firstName: 'Test',
      lastName: 'User',
      email: uuid().slice(0, 8),
      password: uuid().slice(0, 5),
      phoneNumber: uuid().slice(0, 5),
    };

    await createUserService.execute(userToCreate);

    await expect(
      createUserService.execute(userToCreate),
    ).rejects.toBeInstanceOf(AppError);
  });
});
