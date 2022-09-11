import React from 'react';

import CodeText from '../CodeText/CodeText';

import { TitleStyled } from './Title.styles';

interface ITitleProps {
  children: React.ReactNode;
}

const Title: React.FC<ITitleProps> = ({children}) => {
  return (
    <TitleStyled>
      {children}
    </TitleStyled>
  );
};

export default Title;