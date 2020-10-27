"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _path = _interopRequireDefault(require("path"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateUserService {
  constructor(usersRepository, hashProvider, mailProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.mailProvider = mailProvider;
  }

  async execute({
    firstName,
    lastName,
    email,
    password
  }) {
    const userEmailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExist) {
      throw new _AppError.default('Endereço de E-Mail já utilizado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const verifyAccountTemplate = _path.default.resolve(__dirname, '..', 'views', 'verify_account.hbs');

    this.mailProvider.sendMail({
      to: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      },
      subject: '[SIGLA] Bem Vindo! ',
      templateData: {
        file: verifyAccountTemplate,
        variables: {
          name: user.firstName,
          link: `${process.env.APP_URL}/verify?id=${user.id}`
        }
      }
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;