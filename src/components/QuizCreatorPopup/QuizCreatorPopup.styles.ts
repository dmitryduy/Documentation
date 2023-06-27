import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  transition: .3s;
  z-index: 100;

  &.active {
    opacity: 1;
    pointer-events: visible;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

export const PopupContent = styled.div`
  position: absolute;
  display: flex;
  background-color: ${props => props.theme.colors.background};
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  width: 90%;
  max-width: 1200px;
  transition: .3s;
  gap: 10px;

  & > div {
    flex: 1;
    margin-bottom: 0;
  }
`;

export const QuizConstructor = styled.div`
  display: flex;
  flex-direction: column;
  counter-reset: section;
  height: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    align-items: center !important;
  }
`;

export const QuizContent = styled.div`
  overflow: auto;
  flex: 1;
`;