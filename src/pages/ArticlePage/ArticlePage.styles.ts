import styled from 'styled-components';

export const ArticlePageStyled = styled.div`
  display: flex;
  margin: 20px;
`;

export const Menu = styled.aside`
  position: fixed;
  right: 0;
  width: 300px;
  top: 70px;
  height: fit-content;
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: 20px 0;

  ul {
    margin-left: 15px;
  }

  li {
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
  min-height: calc(100vh - 90px);
  width: 100%;
  margin: 0 300px;
`;