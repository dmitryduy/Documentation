import styled from 'styled-components';

export const InputStyled = styled.input`
  background-color: ${props => props.theme.colors.inputBg};
  border: 2px solid transparent;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  transition: .3s;
  &:focus, &:hover {
    border: 2px solid ${props => props.theme.colors.inputBorder};
    background-color: transparent;
    outline: none;
  }
`;
