"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

var _GetSessionsService = _interopRequireDefault(require("../../../services/GetSessionsService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(req, res) {
    const {
      email,
      password
    } = req.body;

    const autheticateUser = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      user,
      token
    } = await autheticateUser.execute({
      email,
      password
    });
    return res.status(200).json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

  async getSession(req, res) {
    const getSessions = _tsyringe.container.resolve(_GetSessionsService.default);

    const {
      id
    } = req.user;
    const user = await getSessions.execute({
      userId: id
    });
    return res.status(200).json({
      user: (0, _classTransformer.classToClass)(user)
    });
  }

}

exports.default = SessionsController;