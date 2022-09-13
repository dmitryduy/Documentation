import styled from 'styled-components';

export const InputStyled = styled.input`
  background-color: ${props => props.theme.colors.inputBg};
  border: 2px solid transparent;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  transition: .3s;
  width: 100%;

  &:focus, &:hover {
    border: 2px solid ${props => props.theme.colors.inputBorder};
    background-color: transparent;
    outline: none;
  }

  @media (max-width: 1000px) {
    font-size: 15px;
  }
`;
