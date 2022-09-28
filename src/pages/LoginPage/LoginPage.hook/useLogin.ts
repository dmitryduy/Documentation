import { useState } from 'react';

import { fetchLogin } from '../../../api/fetchLogin';
import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { loginUser } from '../../../reducers/authReducer/authReducer';
import { Errors } from '../../../errors';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const signUp = (login: string, password: string) => {
    const loginTrimmed = login.trim();
    const passwordTrimmed = password.trim();
    if (!loginTrimmed || !passwordTrimmed) {
      return;
    }
    setIsLoading(true);
    fetchLogin(passwordTrimmed, loginTrimmed)
      .then(data => {
        setIsLoading(false);
        if (data.error) {
          showTooltip(data.error);
          return;
        }
        dispatch(loginUser(data.login!));
      }).catch(e => {
        setIsLoading(false);
        const error = e.response && e.response.data && e.response.data.error;
        showTooltip(error || Errors.UNEXPECTED_ERROR);
      });
  };

  return {isLoading, signUp};
};
