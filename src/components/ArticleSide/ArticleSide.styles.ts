import styled from 'styled-components';

export const ArticleSideStyled = styled.div`
  display: flex;
  width: calc(100vw - 300px - 300px - 20px);
  margin-left: 310px;
  margin-top: 10px;
  flex-direction: column;
  transition: .3s;
  margin-bottom: 70px;
  
  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
  }

  &.transform {
    transform: translateX(300px);
  }
`;


export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  svg {
    width: 20px;
    height: 20px;
  }
  
  .delete:hover, .edit:hover {
      text-decoration: underline;
  }
  .delete {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: ${props => props.theme.colors.deletion};
    svg {
     fill: ${props => props.theme.colors.deletion}; 
    }
  }
  .edit {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    z-index: 2;
    color: ${props => props.theme.colors.link};
    svg {
      fill: ${props => props.theme.colors.link};
    }
  }`;