"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ActiveUserService = _interopRequireDefault(require("../../../services/ActiveUserService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VerifyUserController {
  async create(request, response) {
    const {
      id
    } = request.body;

    const activeUser = _tsyringe.container.resolve(_ActiveUserService.default);

    await activeUser.execute({
      userId: id
    });
    return response.status(204).json({});
  }

}

exports.default = VerifyUserController;