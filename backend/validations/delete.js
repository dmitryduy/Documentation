"use strict";
exports.__esModule = true;
exports.deleteValidation = void 0;
var express_validator_1 = require("express-validator");
exports.deleteValidation = [
    (0, express_validator_1.body)('owner', 'Неверный Пользователь.').isString(),
    (0, express_validator_1.body)('link', 'Неверная ссылка.').isString(),
];
