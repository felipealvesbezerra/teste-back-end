import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/users.model';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}
