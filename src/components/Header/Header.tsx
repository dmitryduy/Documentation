import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { EmitterNames } from '../../emitterNames';
import {ReactComponent as BurgerSvg} from '../../assets/images/burger.svg';
import useMatchMedia from '../../hooks/useMatchMedia';
import SearchPost from '../SearchPost/SearchPost';
import {ReactComponent as LightThemeSvg} from '../../assets/images/lightTheme.svg';
import {ReactComponent as DarkThemeSvg} from '../../assets/images/darkTheme.svg';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { logout } from '../../reducers/authReducer/authReducer';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

import { HeaderStyled } from './Header.styles';

const Header = () => {
  const {theme, toggleTheme} = useTheme();
  const {isLogin} = useAuth();
  const phone = useMatchMedia();
  const dispatch  = useAppDispatch();
  const toggleLeftSide = () => {
    phone && window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderStyled>
      {phone && <BurgerSvg className="hamburger" onClick={toggleLeftSide}/>}
      <nav>
        <ul>
          <li className="home">
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/">
              Главная
            </NavLink>
          </li>
          <li className="search">
            <SearchPost/>
          </li>
          <li className="theme" onClick={toggleTheme}>{theme === 'dark' ? <LightThemeSvg/> : <DarkThemeSvg/>}</li>
          {isLogin && <li className="auth" onClick={onLogout}>Выйти</li>}
          {!isLogin && <Link to="/login" className="auth">Войти</Link>}
        </ul>
      </nav>
    </HeaderStyled>
  );
};

export default Header;