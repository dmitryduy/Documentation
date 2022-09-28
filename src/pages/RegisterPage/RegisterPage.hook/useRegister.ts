import { useState } from 'react';

import { useAppDispatch } from '../../../hooks/useAppSelector';
import { fetchLogin } from '../../../api/fetchLogin';
import { showTooltip } from '../../../utils/showTooltip';
import { loginUser } from '../../../reducers/authReducer/authReducer';
import { Errors } from '../../../errors';
import {
  LOGIN_LENGTH_ERROR,
  LOGIN_REGEX,
  LOGIN_REGEX_ERROR, MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH, PASSWORD_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR
} from '../RegisterPage.constants';
import { fetchRegister } from '../../../api/fetchRegister';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    fetchRegister(passwordTrimmed, loginTrimmed)
      .then(data => {
        setIsLoading(false);
        if (data.error) {
          showTooltip(data.error);
          return;
        }
        dispatch(loginUser(data.login!));
        window.localStorage.setItem('auth-token', data.token!);
      }).catch(e => {
        setIsLoading(false);
        const error = e.response && e.response.data && e.response.data.error;
        showTooltip(error || Errors.UNEXPECTED_ERROR);
      });
  };

  return {isLoading, register};
};