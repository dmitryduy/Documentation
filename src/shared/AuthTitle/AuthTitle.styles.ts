import styled from 'styled-components';

export const AuthTitleStyled = styled.h1`
  font-size: 35px;
  color: ${props => props.theme.colors.paragraph};
  @media (max-width: 500px) {
    font-size: 25px;
  }
`;
