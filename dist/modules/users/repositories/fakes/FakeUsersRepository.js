"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const user = new _User.default();
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(find => find.email === email);
    return user;
  }

  async findById(id) {
    const user = this.users.find(find => find.id === id);
    return user;
  }

  async save(user) {
    const userIndex = this.users.findIndex(find => find.id === user.id);

    if (!userIndex) {
      this.users.push(user);
      return user;
    }

    this.users[userIndex] = user;
    return user;
  }

}

exports.default = FakeUsersRepository;