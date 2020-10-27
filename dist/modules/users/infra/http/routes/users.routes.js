"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _VerifyUserController = _interopRequireDefault(require("../controllers/VerifyUserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const userController = new _UserController.default();
const verifyUserController = new _VerifyUserController.default();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    firstName: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    lastName: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required()
  }
}), userController.create);
usersRouter.post('/verify', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required().uuid()
  }
}), verifyUserController.create);
var _default = usersRouter;
exports.default = _default;