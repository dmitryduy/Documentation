import { body } from 'express-validator';

export const creationValidation = [
  body('markdown', 'Неверный текст поста.').isString(),
  body('tags', 'Неверное количество тегов.').isArray({min: 1, max: 15}),
  body('menu', 'Неверное меню.').isArray(),
  body('title', 'Неверный заголовок поста.').isString(),
  body('owner', 'Неверный пользователь.').isString()
];
