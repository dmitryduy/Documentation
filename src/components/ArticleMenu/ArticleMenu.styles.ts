import styled from 'styled-components';

export const ArticleMenuStyled = styled.div`
  position: fixed;
  right: 0;
  width: 300px;
  top: 70px;
  height: fit-content;
  max-height: calc(100vh - 70px - 80px);
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: 20px 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 10;
  overflow: auto;

  ul {
    margin-left: 15px;
  }

  li {
    list-style-type: none;
    padding: 5px 0;
    cursor: pointer;
    word-break: break-word;

    a {
      * {
        padding: 0;
        margin: 0;
      }
      color: ${props => props.theme.colors.sideMenu};
    }

    a:hover, a:visited {
      * {
        color: ${props => props.theme.colors.link};
      }
    }
  }
`;
