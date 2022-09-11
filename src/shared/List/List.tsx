import React from 'react';

import {ListStyled} from './List.styles';

interface IListProps {
    children: React.ReactNode
}

const List: React.FC<IListProps> = ({children}) => {
  return (
    <ListStyled>
      {children}
    </ListStyled>
  );
};

export default List;