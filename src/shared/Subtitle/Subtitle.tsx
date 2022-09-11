import React from 'react';

import { SubtitleStyled } from './Subtitle.styles';

interface ISubtitleProps {
  children: React.ReactNode;
  id: string;
}

const Subtitle: React.FC<ISubtitleProps> = ({children, id}) => {
  return (
    <SubtitleStyled id={id}>
      {children}
    </SubtitleStyled>
  );
};

export default Subtitle;