import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import GetSessionsService from './GetSessionsService';

let usersRepository: IUsersRepository;
let getSessions: GetSessionsService;

describe('Get User Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    getSessions = new GetSessionsService(usersRepository);
  });
  it('should be get session', async () => {
    const user = await usersRepository.create({
      email: uuid().slice(0, 4),
      firstName: 'Ol',
      lastName: 'a',
      password: '54687',
    });

    expect(await getSessions.execute({ userId: user.id })).toMatchObject(user);
  });

  it('should not be get Session', async () => {
    await expect(
      getSessions.execute({ userId: `sdasd` }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
