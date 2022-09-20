import styled from 'styled-components';

export const CodeTextStyled = styled.code`
  background-color: ${props => props.theme.colors.codeBg};
  padding: 0 5px;
  border-radius: 5px;
  width: fit-content;
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 25px;
  color: ${props => props.theme.colors.paragraph};
  @media (max-width: 500px) {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 20px;
  }
`;
