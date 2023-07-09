import React from 'react';
import cn from 'classnames';

import {SwitcherStyled, SwitcherContainer} from './Switcher.styles';

interface ISwitcherProps {
    isActive: boolean;
    toggle: () => void;
    title: string;
}

const Switcher: React.FC<ISwitcherProps> = ({isActive, toggle, title}) => {
  return (
    <SwitcherContainer>
      <p>{title}</p>
      <SwitcherStyled className={cn({isActive})} onClick={toggle}/>
    </SwitcherContainer>
  );
};

export default Switcher;