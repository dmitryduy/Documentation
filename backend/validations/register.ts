import { body } from 'express-validator';

export const registerValidation = [
  body('login', 'Неверный логин.').isString(),
  body('password', 'Неверный тип пароля.').isString(),
];