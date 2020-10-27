import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import FindUserService from './FindUserService';

let usersRepository: IUsersRepository;
let findUser: FindUserService;

describe('It should test Find User Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    findUser = new FindUserService(usersRepository);
  });
  it('should find a user by email', async () => {
    const myUser = {
      email: uuid().slice(0, 4),
      firstName: 'Ol',
      lastName: 'a',
      phoneNumber: '4489',
      password: '54687',
    };

    const savedUser = await usersRepository.create(myUser);

    const foundUser = await findUser.execute({
      email: myUser.email,
    });
    expect(foundUser?.email).toMatch(savedUser.email);
  });

  it('should find a user by id', async () => {
    const myUser = {
      email: uuid().slice(0, 4),
      firstName: 'Ol',
      lastName: 'a',
      phoneNumber: '4489',
      password: '54687',
    };

    const savedUser = await usersRepository.create(myUser);

    const foundUser = await findUser.execute({
      id: savedUser.id,
    });
    expect(foundUser?.id).toMatch(savedUser.id);
  });

  it('should not find a user by name that user not exists', async () => {
    const foundUser = await findUser.execute({
      email: 'romariozinho',
    });
    expect(foundUser).toEqual(undefined);
  });

  it('should not find a user by id that user not exists', async () => {
    const foundUser = await findUser.execute({
      id: 'romariozinho',
    });
    expect(foundUser).toEqual(undefined);
  });

  it('It should generate a error when arguments not have sended', async () => {
    await expect(findUser.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
