import styled from 'styled-components';

export const ArticlePageStyled = styled.div`
  display: flex;
  margin: 20px;
  width: 100vw;
  padding: 0 2vw;
  @media (max-width: 1000px) {
  margin: 10px;
    width: calc(100vw - 20px);
  }
`;

export const Menu = styled.aside`
  position: fixed;
  right: 0;
  width: 200px;
  top: 70px;
  height: fit-content;
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: 20px 0;
  background-color: #fff;
  z-index: 10000;

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

export const Content = styled.div`
  width: 100%;
  margin: 10px 230px 10px 200px;
  display: flex;
  flex-direction: column;
  transition: .3s;
  &.transform {
    transform: translateX(300px);
  }
  
  .edit {
    align-self: flex-end;
    position: relative;
    z-index: 2;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 1000px) {
   margin: 10px 0;
  }
`;