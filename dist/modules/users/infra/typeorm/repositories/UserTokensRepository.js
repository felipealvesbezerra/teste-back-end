"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UserTokensRepository = (_dec = (0, _typeorm.EntityRepository)(_UserToken.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class UserTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async generate(userId) {
    const user = this.ormRepository.create({
      userId
    });
    await this.ormRepository.save(user);
    return user;
  }

  async findByToken(token) {
    const user = this.ormRepository.findOne({
      where: {
        token
      }
    });
    return user;
  }

  async deleteById(id) {
    await this.ormRepository.delete({
      id
    });
  }

}, _temp)) || _class) || _class) || _class);
exports.default = UserTokensRepository;