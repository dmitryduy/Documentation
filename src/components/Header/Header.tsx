import React from 'react';
import { NavLink } from 'react-router-dom';

import { useResize } from '../../hooks/useResize';
import { EmitterNames } from '../../emitterNames';
import {ReactComponent as BurgerSvg} from '../../assets/images/burger.svg';

import { HeaderStyled } from './Header.styles';



const Header = () => {
  const width = useResize();

  const toggleLeftSide = () => {
    window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
  };

  return (
    <HeaderStyled>
      {width < 1001 && <BurgerSvg onClick={toggleLeftSide}/>}
      <nav>
        <ul>
          <li>
            <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="/Documentation">
              Главная
            </NavLink>
          </li>
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
    </HeaderStyled>
  );
};

export default Header;