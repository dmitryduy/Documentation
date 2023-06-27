import React from 'react';
import cn from 'classnames';

import {SwitcherStyled} from './Switcher.styles';

interface ISwitcherProps {
    isActive: boolean;
    toggle: () => void;
}

const Switcher: React.FC<ISwitcherProps> = ({isActive, toggle}) => {
  return (
    <SwitcherStyled className={cn({isActive})} onClick={toggle}/>
  );
};

export default Switcher;