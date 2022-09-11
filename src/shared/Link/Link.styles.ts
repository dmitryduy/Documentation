import styled from 'styled-components';

export const LinkStyled = styled.a`
  &:visited {
    color: ${props => props.theme.colors.link};
  }
  color: ${props => props.theme.colors.link};

  code {
    color: ${props => props.theme.colors.link};
  }

  text-decoration: none;
  font-size: 17px;
  
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.link};
  }
`;
