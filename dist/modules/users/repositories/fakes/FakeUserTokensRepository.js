"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserTokensRepository {
  constructor() {
    this.userTokens = [];
  }

  async generate(userId) {
    const user = new _UserToken.default();
    Object.assign(user, {
      userId,
      createAt: new Date(),
      updateAt: new Date()
    });
    this.userTokens.push(user);
    return user;
  }

  async findByToken(token) {
    const user = this.userTokens.find(find => find.token === token);
    return user;
  }

  async deleteById(id) {
    const tokenIndex = this.userTokens.findIndex(tokens => tokens.id === id);

    if (!tokenIndex) {
      return;
    }

    this.userTokens.splice(tokenIndex, 1);
  }

}

exports.default = FakeUserTokensRepository;