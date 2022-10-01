import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { showTooltip } from '../../../utils/showTooltip';
import { signUp } from '../../../reducers/authReducer/authReducer';
import { checkRegisterData } from '../RegisterPage.utils/checkRegisterData';
import { storage } from '../../../utils/storage';

export const useSignIn = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const register = (dirtyLogin: string, dirtyPassword: string, dirtyRepeatPassword: string) => {
    const login = dirtyLogin.trim();
    const password = dirtyPassword.trim();
    const repeatPassword = dirtyRepeatPassword.trim();

    const error = checkRegisterData(login, password, repeatPassword);

    if (error) {
      showTooltip(error);
      return;
    }

    dispatch(signUp({login, password}))
      .unwrap()
      .then(data => storage('auth-token').setItem(data.token))
      .catch(showTooltip);
  };

  return {isLoading, register};
};