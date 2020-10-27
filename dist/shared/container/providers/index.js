"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./MailProvider/implementations/EtherealMailProvider"));

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));

var _SESMailProvider = _interopRequireDefault(require("./MailProvider/implementations/SESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('MailTemplateProvider', _HandlebarsMailTemplateProvider.default);

_tsyringe.container.registerInstance('MailProvider', _mail.default.driver === 'ethereal' ? _tsyringe.container.resolve(_EtherealMailProvider.default) : _tsyringe.container.resolve(_SESMailProvider.default));