import styled from 'styled-components';
import {rgba} from 'polished';

export const AuthButtonStyled = styled.button`
  border: none;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  background-color: ${props => props.theme.colors.authButton};
  border-radius: 5px;
  box-shadow: 0 0 4px 0 ${props => rgba(props.theme.colors.authButton, 0.5)};
`;
