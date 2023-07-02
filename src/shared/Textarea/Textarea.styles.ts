import styled from 'styled-components';

export const TextareaStyled = styled.textarea`
  margin-top: 10px;
  outline: none;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.paragraph};
  border: 1px solid ${props => props.theme.colors.border};
  font-size: 16px;
  resize: none;
  padding: 5px;
`;
