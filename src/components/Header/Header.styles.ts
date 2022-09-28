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

  align-self: center;
  justify-content: space-between;
  box-shadow: 0 2px 2px 0 rgba(34, 60, 80, 0.2);
  background-color: ${props => props.theme.colors.bg};
  
  svg {
    height: 20px;
    width: 20px;
  }

  nav, ul {
    display: flex;
    width: 100%;
    gap: 10px;
  }

  .home {
    margin-left: 5px;
  }
  li {
    list-style-type: none;
  }
  
  .search {
    flex: 1;
  }

  a {
    text-decoration: none;
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
