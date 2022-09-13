import React from 'react';

import {ListStyled} from './List.styles';

interface IListProps {
    children: React.ReactNode;
    as: 'ul' | 'ol';
}

const List: React.FC<IListProps> = ({children, as}) => {
  return (
    <ListStyled as={as}>
      {children}
    </ListStyled>
  );
};

export default List;