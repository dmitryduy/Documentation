import styled from 'styled-components';

export const ArticlePageStyled = styled.div`
  display: flex;
  margin: 20px;
  width: 100vw;
  @media (max-width: 1000px) {
  margin: 10px;
    width: calc(100vw - 20px);
  }
`;

export const Menu = styled.aside`
  position: fixed;
  right: 0;
  width: 200px;
  top: 50px;
  height: fit-content;
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: 20px 0;
  background-color: #fff;
  @media (max-width: 1000px) {
    transition: .3s;
    font-size: 14px;
    height: calc(100vh - 50px);
    top: 50px;
    transform: translateX(100%);
    &.active {
      transform: translateX(0);
    }
  }

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