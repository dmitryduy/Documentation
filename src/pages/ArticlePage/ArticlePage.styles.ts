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