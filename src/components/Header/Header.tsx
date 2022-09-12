import React from 'react';
import { NavLink } from 'react-router-dom';

import { useResize } from '../../hooks/useResize';
import { EmitterNames } from '../../emitterNames';

import { HeaderStyled } from './Header.styles';


const Header = () => {
  const width = useResize();
  const toggleRightSide = () => {
    window.emitter.emit(EmitterNames.TOGGLE_RIGHT_SIDEBAR);
  };

  const toggleLeftSide = () => {
    window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
  };

  return (
    <HeaderStyled>
      {width < 1001 && <svg onClick={toggleLeftSide} width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"
          d="M4 7h22M4 15h22M4 23h22"/>
      </svg>}
      <nav>
        <ul>
          {width > 600 && <li>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/Documentation">
              Главная
            </NavLink>
          </li>}
          <li>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/create-post">
              Добавить статью
            </NavLink>
          </li>
          {width > 600 && <li>
            <NavLink to="post/Как-пользоваться-редактором">
              Как пользоваться редактором
            </NavLink>
          </li>}
        </ul>
      </nav>
      {width < 1001 && <svg onClick={toggleRightSide} width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"
          d="M4 7h22M4 15h22M4 23h22"/>
      </svg>}
    </HeaderStyled>
  );
};

export default Header;