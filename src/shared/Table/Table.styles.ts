import styled from 'styled-components';

export const TableStyled = styled.table`
  border: 1px solid ${props => props.theme.colors.border};
  border-collapse: collapse;
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 100%;
  overflow-x: auto;
  thead tr {
    background-color: ${props => props.theme.colors.tableEven};
    border-bottom: 2px solid ${props => props.theme.colors.border};
  }
  th {
    font-weight: bold;
    padding: 10px;
    border-right: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.paragraph};
  }
  
  td {
    text-align: left;
    padding: 10px;
    border-right: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.paragraph};
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