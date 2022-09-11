import styled from 'styled-components';

export const CodeTextStyled = styled.code`
  background-color: ${props => props.theme.colors.codeBg};
  padding: 0 5px;
  border-radius: 5px;
  width: fit-content;
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 25px;
  font-size: 17px;
  color: ${props => props.theme.colors.paragraph};
`;
