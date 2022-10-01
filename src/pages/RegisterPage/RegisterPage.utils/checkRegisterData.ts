import {
  FIELD_EMPTY_ERROR,
  LOGIN_LENGTH_ERROR,
  LOGIN_REGEX,
  LOGIN_REGEX_ERROR,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_NOT_EQUALS,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR
} from '../RegisterPage.constants';


export const checkRegisterData = (login: string, password: string, repeatPassword: string) => {
  if (!login || !password || !repeatPassword) {
    return FIELD_EMPTY_ERROR;
  }
  if (password !== repeatPassword) {
    return PASSWORD_NOT_EQUALS;
  }
  if (!LOGIN_REGEX.test(login)) {
    return LOGIN_REGEX_ERROR;
  }
  if (!PASSWORD_REGEX.test(password)) {
    return PASSWORD_REGEX_ERROR;
  }
  if (login.length > MAX_LOGIN_LENGTH || login.length < MIN_LOGIN_LENGTH) {
    return LOGIN_LENGTH_ERROR;
  }
  if (password.length > MAX_PASSWORD_LENGTH || password.length < MIN_PASSWORD_LENGTH) {
    return PASSWORD_LENGTH_ERROR;
  }
  return null;
};
