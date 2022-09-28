import styled from 'styled-components';

export const ArticlePageStyled = styled.div`
  display: flex;
  width: 100vw;
  @media (max-width: 1000px) {
    margin: 10px;
    width: calc(100vw - 20px);
  }

  .add-post {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 100000;
    gap: 5px;
    color: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-weight: 300;
    box-shadow: 4px 4px 10px 0 rgba(34, 60, 80, 0.2);
    background-color: ${props => props.theme.colors.link};
    path {
      fill: ${props => props.theme.colors.link};
    }
    polygon{
      fill:  #fff;
    }
  }
`;