import styled from 'styled-components';

export const LoaderStyled = styled.div`
  margin: 0 auto;
  width: 30px;
  align-self: center;
  justify-self: center;
  height: 30px;
  border: 2px solid ${props => props.theme.colors.border};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;
