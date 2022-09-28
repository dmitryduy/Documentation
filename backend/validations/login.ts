import { body } from 'express-validator';

export const loginValidation = [
  body('login', 'Неверный логин.').isString(),
  body('password', 'Неверный тип пароля.').isString(),
];