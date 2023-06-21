import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { setUser } from '../../../reducers/authReducer/authReducer';
import { storage } from '../../../utils/storage';
import { createUserManager } from '../../../api/userManager/createUserManager';

export const useSignUp = () => {
  const isLoading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const signUp = (login: string, password: string) => {
    const userManager = createUserManager();

    userManager.signIn({login, password})
      .then(data => {
        storage('auth-token').setItem(data.token);
        dispatch(setUser({login: data.login}));
      })
      .catch(showTooltip);
  };

  return {isLoading, signUp};
};
