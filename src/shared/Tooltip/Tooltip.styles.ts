import styled from 'styled-components';

export const TooltipStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  z-index: 1000000;
  border-radius: 10px;
  visibility: hidden;
  opacity: 0;
  transition: .3s;
  &.active {
    visibility: visible;
    opacity: 1;
  }
  
`;
