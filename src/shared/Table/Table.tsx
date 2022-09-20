import React from 'react';

import {TableStyled, Wrapper} from './Table.styles';

interface ITableProps {
    children: React.ReactNode
}

const Table: React.FC<ITableProps> = ({children}) => {
  return (
    <Wrapper>
      <TableStyled>
        {children}
      </TableStyled>
    </Wrapper>
  );
};

export default Table;