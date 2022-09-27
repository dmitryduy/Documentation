import styled from 'styled-components';

export const ArticlePageStyled = styled.div`
  display: flex;
  width: 100vw;
  @media (max-width: 1000px) {
    margin: 10px;
    width: calc(100vw - 20px);
  }
`;