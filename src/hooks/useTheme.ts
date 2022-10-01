import { changeTheme } from '../reducers/settingsReducer/settingsReducer';

import { useAppDispatch, useAppSelector } from './useAppSelector';

export const useTheme = () => {
  const theme = useAppSelector(state => state.settings.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  return {theme, toggleTheme};
};
