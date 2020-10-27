"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Initial1603838775345 = void 0;

class Initial1603838775345 {
  constructor() {
    this.name = 'Initial1603838775345';
  }

  async up(queryRunner) {
    await queryRunner.query("CREATE TABLE `app_products` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `price` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query("CREATE TABLE `app_users` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `verify` tinyint NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_14241fb016a330600a7e0efae9` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query("CREATE TABLE `users_token` (`id` varchar(36) NOT NULL, `token` varchar(255) NOT NULL, `userId` varchar(36) NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
  }

  async down(queryRunner) {
    await queryRunner.query("DROP TABLE `users_token`");
    await queryRunner.query("DROP INDEX `IDX_14241fb016a330600a7e0efae9` ON `app_users`");
    await queryRunner.query("DROP TABLE `app_users`");
    await queryRunner.query("DROP TABLE `app_products`");
  }

}

exports.Initial1603838775345 = Initial1603838775345;