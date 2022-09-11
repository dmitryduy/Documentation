import React from 'react';
import { NavLink } from 'react-router-dom';

import { HeaderStyled } from './Header.styles';


const Header = () => {
  return (
    <HeaderStyled>
      <nav>
        <ul>
          <li>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/create-post">
              Добавить статью
            </NavLink>
          </li>
          <li>
            <NavLink to="/post/Как-пользоваться-редактором">
              Как пользоваться редактором
            </NavLink>
          </li>
        </ul>
      </nav>
    </HeaderStyled>
  );
};

export default Header;