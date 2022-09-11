import React from 'react';

import { CodeTextStyled } from './CodeText.styles';

interface ICodeTextProps {
  children: React.ReactNode;
  fontWeight?: 'bold' | 'normal';
}

const CodeText: React.FC<ICodeTextProps> = ({children, fontWeight}) => {
  return (
    <CodeTextStyled style={{fontWeight: fontWeight || 'normal'}}>
      {children}
    </CodeTextStyled>
  );
};

export default CodeText;