import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import {  signIn } from '../../../reducers/authReducer/authReducer';
import { storage } from '../../../utils/storage';

export const useSignUp = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const signUp = (dirtyLogin: string, dirtyPassword: string) => {
    const login = dirtyLogin.trim();
    const password = dirtyPassword.trim();
    if (!login || !password) {
      return;
    }
    dispatch(signIn({login, password}))
      .unwrap()
      .then(data => storage('auth-token').setItem(data.token))
      .catch(showTooltip);
  };

  return {isLoading, signUp};
};
