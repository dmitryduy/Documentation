export const MAX_LOGIN_LENGTH = 15;
export const MAX_PASSWORD_LENGTH = 30;
export const MIN_LOGIN_LENGTH = 5;
export const MIN_PASSWORD_LENGTH = 8;
export const LOGIN_REGEX = /^[a-zA-ZА-Яа-я0-9]+$/;
export const PASSWORD_REGEX = /^[a-zA-ZА-Яа-я0-9!?\-*#$]+$/;
export const LOGIN_LENGTH_ERROR =
  `Длина логина не должна превышать ${MAX_LOGIN_LENGTH} и не должна быть меньше ${MIN_LOGIN_LENGTH}`;
export const PASSWORD_LENGTH_ERROR =
  `Длина пароля не должна превышать ${MAX_PASSWORD_LENGTH} и не должна быть меньше ${MIN_PASSWORD_LENGTH}`;
export const LOGIN_REGEX_ERROR =
  'Логин может состоять только из симолов русского и английского алфавита, а также из чисел';
export const PASSWORD_REGEX_ERROR =
  'Пароль может состоять только из симолов русского и английского алфавита, а также из чисел и символов: "!?-*$#"';