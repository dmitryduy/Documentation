import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { showTooltip } from '../../../utils/showTooltip';
import { setUser } from '../../../reducers/authReducer/authReducer';
import { checkRegisterData } from '../RegisterPage.utils/checkRegisterData';
import { storage } from '../../../utils/storage';
import { createUserManager } from '../../../api/userManager/createUserManager';

export const useSignIn = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const register = (login: string, password: string, repeatPassword: string) => {

    const userManager = createUserManager();
    userManager.signUp({login, password, repeatPassword})
      .then(data => {
        storage('auth-token').setItem(data.token);
        dispatch(setUser({login: data.login}));
      })
      .catch(showTooltip);
  };

  return {isLoading, register};
};