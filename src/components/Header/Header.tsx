import React from 'react';
import { NavLink } from 'react-router-dom';

import { EmitterNames } from '../../emitterNames';
import {ReactComponent as BurgerSvg} from '../../assets/images/burger.svg';
import useMatchMedia from '../../hooks/useMatchMedia';
import SearchPost from '../SearchPost/SearchPost';
import {ReactComponent as LogoutSvg} from '../../assets/images/logout.svg';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { logout } from '../../reducers/authReducer/authReducer';

import { HeaderStyled } from './Header.styles';



const Header = () => {
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
      {phone && <BurgerSvg onClick={toggleLeftSide}/>}
      <nav>
        <ul>
          <li className="home">
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/Documentation">
              Главная
            </NavLink>
          </li>
          <li className="search">
            <SearchPost/>
          </li>
          <li className="logout" onClick={onLogout}>
            <LogoutSvg/>
          </li>
        </ul>
      </nav>
    </HeaderStyled>
  );
};

export default Header;