import React from 'react';
import { NavLink } from 'react-router-dom';

import { EmitterNames } from '../../emitterNames';
import {ReactComponent as BurgerSvg} from '../../assets/images/burger.svg';
import useMatchMedia from '../../hooks/useMatchMedia';
import SearchPost from '../SearchPost/SearchPost';
import {ReactComponent as EditSvg} from '../../assets/images/edit.svg';

import { HeaderStyled } from './Header.styles';



const Header = () => {
  const phone = useMatchMedia();

  const toggleLeftSide = () => {
    phone && window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
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
        </ul>
      </nav>
    </HeaderStyled>
  );
};

export default Header;