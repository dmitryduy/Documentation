import React from 'react';

import {ParagraphStyled} from './Paragraph.styles';

interface IParagraphProps {
    children: React.ReactNode
}

const Paragraph: React.FC<IParagraphProps> = ({children}) => {
  return (
    <ParagraphStyled>
      {children}
    </ParagraphStyled>
  );
};

export default Paragraph;