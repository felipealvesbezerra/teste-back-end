"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _typeorm.Entity)('app_users'), _dec2 = (0, _typeorm.PrimaryColumn)({
  type: 'varchar',
  length: '36'
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  type: 'varchar'
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)({
  nullable: false,
  unique: true
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)({
  nullable: false
}), _dec11 = (0, _classTransformer.Exclude)(), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.Column)({
  nullable: false,
  type: 'bool',
  transformer: {
    to: entityValue => entityValue ? 1 : 0,
    from: DbValue => !!DbValue
  }
}), _dec14 = (0, _typeorm.CreateDateColumn)(), _dec15 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec16 = (0, _typeorm.UpdateDateColumn)(), _dec17 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = (_temp = class User {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "firstName", _descriptor2, this);

    _initializerDefineProperty(this, "lastName", _descriptor3, this);

    _initializerDefineProperty(this, "email", _descriptor4, this);

    _initializerDefineProperty(this, "password", _descriptor5, this);

    _initializerDefineProperty(this, "verify", _descriptor6, this);

    _initializerDefineProperty(this, "createAt", _descriptor7, this);

    _initializerDefineProperty(this, "updateAt", _descriptor8, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return (0, _uuid.v4)();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "firstName", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastName", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "verify", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "createAt", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "updateAt", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = User;
exports.default = _default;