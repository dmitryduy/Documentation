import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {ReactComponent as BurgerSvg} from '@assets/images/burger.svg';
import useMatchMedia from '@hooks/useMatchMedia';
import {ReactComponent as LightThemeSvg} from '@assets/images/lightTheme.svg';
import {ReactComponent as DarkThemeSvg} from '@assets/images/darkTheme.svg';
import { useStores } from '@hooks/useStores';
import { Event, eventManager } from '@utils/emitter';

import SearchPost from '../SearchPost/SearchPost';

import { HeaderStyled } from './Header.styles';

const Header = observer(() => {
  const {settingsStore, authStore} = useStores();
  const phone = useMatchMedia();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLeftSide = () => {
    phone && eventManager.emit(Event.TOGGLE_LEFT_SIDEBAR);
  };

  const navigateToLogin = () => {
    navigate('/login', {state: {from: location}});
  };

  const logout = () => {
    authStore.logout();
    navigate('/article');
  };

  return (
    <HeaderStyled>
      {phone && <BurgerSvg className="hamburger" onClick={toggleLeftSide}/>}
      <nav>
        <ul>
          <li className="home">
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/article">
              Главная
            </NavLink>
          </li>
          <li className="search">
            <SearchPost/>
          </li>
          <li className="theme" onClick={() => settingsStore.changeTheme()}>
            {settingsStore.theme === 'dark' ? <LightThemeSvg/> : <DarkThemeSvg/>}
          </li>
          {authStore.login && <li className="auth" onClick={logout}>Выйти</li>}
          {!authStore.login && <li onClick={navigateToLogin} className="auth">Войти</li>}
        </ul>
      </nav>
    </HeaderStyled>
  );
});

export default Header;