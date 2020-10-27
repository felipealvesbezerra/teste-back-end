import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('app_users')
class User {
  @PrimaryColumn({ type: 'varchar', length: '36' })
  id: string = uuid();

  @Column({ type: 'varchar' })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    type: 'bool',
    transformer: {
      to: (entityValue?: boolean) => (entityValue ? 1 : 0),
      from: (DbValue?: number) => !!DbValue,
    },
  })
  verify = false;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

export default User;
