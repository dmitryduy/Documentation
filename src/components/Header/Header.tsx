import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { EmitterNames } from '../../emitterNames';
import {ReactComponent as BurgerSvg} from '../../assets/images/burger.svg';
import useMatchMedia from '../../hooks/useMatchMedia';
import SearchPost from '../SearchPost/SearchPost';
import {ReactComponent as LightThemeSvg} from '../../assets/images/lightTheme.svg';
import {ReactComponent as DarkThemeSvg} from '../../assets/images/darkTheme.svg';
import { useStores } from '../../hooks/useStores';

import { HeaderStyled } from './Header.styles';

const Header = observer(() => {
  const {settingsStore, authStore} = useStores();
  const phone = useMatchMedia();
  const toggleLeftSide = () => {
    phone && window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
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
          <li className="theme" onClick={() => settingsStore.changeTheme()}>
            {settingsStore.theme === 'dark' ? <LightThemeSvg/> : <DarkThemeSvg/>}
          </li>
          {authStore.login && <li className="auth" onClick={() => authStore.logout()}>Выйти</li>}
          {!authStore.login && <Link to="/login" className="auth">Войти</Link>}
        </ul>
      </nav>
    </HeaderStyled>
  );
});

export default Header;