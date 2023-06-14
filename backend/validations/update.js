"use strict";
exports.__esModule = true;
exports.creationValidationResult = exports.creationValidation = void 0;
var express_validator_1 = require("express-validator");
exports.creationValidation = [
    (0, express_validator_1.body)('markdown', 'Неверный текст поста.').isString(),
    (0, express_validator_1.body)('menu', 'Неверное меню.').isArray(),
    (0, express_validator_1.body)('link', 'Неверная ссылка поста.').isString(),
    (0, express_validator_1.body)('user', 'Неверный пользователь.').isString()
];
exports.creationValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: function (error) {
        return { error: error.msg };
    }
});
