"use strict";
exports.__esModule = true;
exports.creationValidation = void 0;
var express_validator_1 = require("express-validator");
exports.creationValidation = [
    (0, express_validator_1.body)('markdown', 'Неверный текст поста.').isString(),
    (0, express_validator_1.body)('tags', 'Неверное количество тегов.').isArray({ min: 1, max: 15 }),
    (0, express_validator_1.body)('menu', 'Неверное меню.').isArray(),
    (0, express_validator_1.body)('title', 'Неверный заголовок поста.').isString(),
    (0, express_validator_1.body)('owner', 'Неверный пользователь.').isString()
];
