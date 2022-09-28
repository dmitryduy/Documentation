import styled from 'styled-components';

export const ArticleSideStyled = styled.div`
  display: flex;
  width: calc(100vw - 300px - 300px - 20px);
  margin-left: 310px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  transition: .3s;
  
  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
  }

  &.transform {
    transform: translateX(300px);
  }

  .edit {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    z-index: 2;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.link};

    svg {
      fill: ${props => props.theme.colors.link};
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Menu = styled.div`
  position: fixed;
  right: 0;
  width: 300px;
  top: 70px;
  height: fit-content;
  max-height: calc(100vh - 70px);
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: 20px 0;
  background-color: #fff;
  z-index: 10;
  overflow: auto;

  ul {
    margin-left: 15px;
  }

  li {
    list-style-type: none;
    padding: 5px 0;
    cursor: pointer;

    a {
      color: ${props => props.theme.colors.sideMenu};
    }

    a:hover, a:visited {
      color: ${props => props.theme.colors.link};
    }
  }
`;
