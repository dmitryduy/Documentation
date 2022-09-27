import styled from 'styled-components';

export const InfoAsideStyled = styled.aside`
  display: flex;
  position: fixed;
  width: 300px;
  top: 50px;
  height: calc(100vh - 50px);
  padding: 10px 5px 10px 0;
  left: 0;
  background-color: #fff;
  z-index: 1;
  border-right: 1px solid ${props => props.theme.colors.border};
  
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    overflow: auto;
  }
  @media (max-width: 1000px) {
    transition: .3s;
    width: 300px;
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }
`;
