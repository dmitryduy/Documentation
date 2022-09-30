
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { showTooltip } from '../../../utils/showTooltip';
import { signUp } from '../../../reducers/authReducer/authReducer';
import {
  LOGIN_LENGTH_ERROR,
  LOGIN_REGEX,
  LOGIN_REGEX_ERROR, MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH, PASSWORD_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR
} from '../RegisterPage.constants';

export const useRegister = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const register = (login: string, password: string, repeatPassword: string) => {
    const loginTrimmed = login.trim();
    const passwordTrimmed = password.trim();
    const repeatPasswordTrimmed = repeatPassword.trim();
    if (!loginTrimmed || !passwordTrimmed || !repeatPasswordTrimmed) {
      showTooltip('Все поля должны быть заполнены');
      return;
    }
    if (passwordTrimmed !== repeatPasswordTrimmed) {
      showTooltip('Пароли не совпадают');
      return;
    }
    console.log(LOGIN_REGEX.test(loginTrimmed), loginTrimmed);
    if (!LOGIN_REGEX.test(loginTrimmed)) {
      showTooltip(LOGIN_REGEX_ERROR);
      return;
    }
    if (!PASSWORD_REGEX.test(passwordTrimmed)) {
      showTooltip(PASSWORD_REGEX_ERROR);
      return;
    }
    if (loginTrimmed.length > MAX_LOGIN_LENGTH || loginTrimmed.length < MIN_LOGIN_LENGTH) {
      showTooltip(LOGIN_LENGTH_ERROR);
      return;
    }
    if (passwordTrimmed.length > MAX_PASSWORD_LENGTH || passwordTrimmed.length < MIN_PASSWORD_LENGTH) {
      showTooltip(PASSWORD_LENGTH_ERROR);
      return;
    }
    dispatch(signUp({login: loginTrimmed, password: passwordTrimmed}))
      .unwrap()
      .then(data => window.localStorage.setItem('auth-token', data.token))
      .catch(showTooltip);
  };

  return {isLoading, register};
};