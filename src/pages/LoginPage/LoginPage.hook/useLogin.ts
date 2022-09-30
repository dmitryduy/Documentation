import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import {  signIn } from '../../../reducers/authReducer/authReducer';

export const useLogin = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const signUp = (login: string, password: string) => {
    const loginTrimmed = login.trim();
    const passwordTrimmed = password.trim();
    if (!loginTrimmed || !passwordTrimmed) {
      return;
    }
    dispatch(signIn({login: loginTrimmed, password: passwordTrimmed}))
      .unwrap()
      .then(data => window.localStorage.setItem('auth-token', data.token))
      .catch(showTooltip);
  };

  return {isLoading, signUp};
};
