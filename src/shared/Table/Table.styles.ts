import styled from 'styled-components';

export const TableStyled = styled.table`
  border: 1px solid ${props => props.theme.colors.border};
  border-collapse: collapse;
  font-size: 16px;
  margin-bottom: 10px;
  thead tr {
    border-bottom: 2px solid ${props => props.theme.colors.border};
  }
  th {
    font-weight: bold;
    padding: 10px;
    border-right: 1px solid ${props => props.theme.colors.border};
  }
  
  td {
    text-align: left;
    padding: 10px;
    border-right: 1px solid ${props => props.theme.colors.border};
    max-width: 500px;
    word-wrap: break-word;
  }
  
  tr {
    border: 1px solid ${props => props.theme.colors.border};
  }
  tr:nth-child(2n) {
    background-color: ${props => props.theme.colors.tableEven};
  }
`;

export const Wrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;