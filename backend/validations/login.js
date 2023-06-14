"use strict";
exports.__esModule = true;
exports.loginValidation = void 0;
var express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)('login', 'Неверный логин.').isString(),
    (0, express_validator_1.body)('password', 'Неверный тип пароля.').isString(),
];
