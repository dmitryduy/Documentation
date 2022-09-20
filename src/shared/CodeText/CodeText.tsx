import React from 'react';

import { CodeTextStyled } from './CodeText.styles';

interface ICodeTextProps {
  children: React.ReactNode;
}

const CodeText: React.FC<ICodeTextProps> = ({children}) => {
  return (
    <CodeTextStyled>
      {children}
    </CodeTextStyled>
  );
};

export default CodeText;