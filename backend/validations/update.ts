import { body, validationResult } from 'express-validator';

export const creationValidation = [
  body('markdown', 'Неверный текст поста.').isString(),
  body('menu', 'Неверное меню.').isArray(),
  body('link', 'Неверная ссылка поста.').isString(),
  body('user', 'Неверный пользователь.').isString()
];

export const creationValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {error: error.msg};
  }
});