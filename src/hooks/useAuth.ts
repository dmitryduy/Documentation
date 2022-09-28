import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const {isLogin, login} = useAppSelector(state => state.auth);

  return {isLogin, login};
};
