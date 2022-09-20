import styled from 'styled-components';

export const InfoAsideStyled = styled.aside`
  position: fixed;
  width: 200px;
  top: 50px;
  height: calc(100vh - 50px);
  padding: 10px 0;
  left: 0;
  background-color: #fff;
  z-index: 1;
  border-right: 1px solid ${props => props.theme.colors.border};
  @media (max-width: 1000px) {
    transition: .3s;
    width: 300px;
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }
`;
