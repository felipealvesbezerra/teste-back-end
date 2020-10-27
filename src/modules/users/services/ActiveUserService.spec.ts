import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ActiveUserService from './ActiveUserService';

let usersRepository: IUsersRepository;
let activeUser: ActiveUserService;

describe('Active User Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    activeUser = new ActiveUserService(usersRepository);
  });
  it('should be active a user', async () => {
    const user = await usersRepository.create({
      email: uuid().slice(0, 4),
      firstName: 'Ol',
      lastName: 'a',
      password: '54687',
    });

    expect(user.verify).toBe(false);

    expect(await activeUser.execute({ userId: user.id })).toMatchObject(
      Object.assign(user, { verify: true }),
    );
  });

  it('should not be active a user that already verified', async () => {
    const user = await usersRepository.create({
      email: uuid().slice(0, 4),
      firstName: 'Ol',
      lastName: 'a',
      password: '54687',
    });

    expect(user.verify).toBe(false);
    await activeUser.execute({ userId: user.id });
    await expect(
      activeUser.execute({ userId: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be active a user not exists', async () => {
    await expect(
      activeUser.execute({ userId: 'asdasd' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
