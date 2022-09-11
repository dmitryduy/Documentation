import styled from 'styled-components';

export const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  z-index: 100;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  padding: 15px;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(34, 60, 80, 0.2);
  background-color: ${props => props.theme.colors.bg};

  nav, ul {
    display: flex;
    width: 100%;
  }

  li:last-child {
    margin-left: auto;
  }

  a {
    text-decoration: none;
    padding: 0 10px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.link};
    }

    &.active {
      color: ${props => props.theme.colors.link};
    }
  }
`;
