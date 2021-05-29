import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1622069782971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'first_name', type: 'varchar' },
          { name: 'middle_name', type: 'varchar', isNullable: true },
          { name: 'last_name', type: 'varchar', isNullable: true },
          { name: 'nickname', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'phone', type: 'varchar', isNullable: true },
          { name: 'cpf', type: 'varchar', isNullable: true },
          { name: 'rg', type: 'varchar', isNullable: true },
          { name: 'state', type: 'varchar', isNullable: true },
          { name: 'city', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
