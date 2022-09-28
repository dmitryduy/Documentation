import { body } from 'express-validator';

export const deleteValidation = [
  body('owner', 'Неверный Пользователь.').isString(),
  body('link', 'Неверная ссылка.').isString(),
];