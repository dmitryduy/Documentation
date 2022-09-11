import React from 'react';

import {SecondTitleStyled} from './SecondTitle.styles';

interface ISecondTitleProps {
    children: React.ReactNode;
    id: string
}

const SecondTitle: React.FC<ISecondTitleProps> = ({children, id}) => {
  return (
    <SecondTitleStyled id={id}>
      {children}
    </SecondTitleStyled>
  );
};

export default SecondTitle;