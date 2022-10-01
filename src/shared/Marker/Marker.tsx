import React from 'react';

import { CodeTextStyled } from './Marker.styles';

interface ICodeTextProps {
  children: React.ReactNode;
}

const Marker: React.FC<ICodeTextProps> = ({children}) => {
  return (
    <CodeTextStyled className="marker">
      {children}
    </CodeTextStyled>
  );
};

export default Marker;