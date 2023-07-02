import styled from 'styled-components';

export const CheckboxStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 5px;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.colors.paragraph};
  transition: .3s;

  &:hover:not(&.isDisabled), &:hover:not(&.isDisabled):after, &.isActive {
    opacity: 1;
    background-color: ${props => props.theme.colors.activeQuizAnswer};
  }

  &:before {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.colors.quizBg};
    box-shadow: 2px 2px 2px 0 rgba(34, 60, 80, 0.2);
  }

  &:before, &:after {
    content: '';
    transition: opacity .2s;
  }

  &:after {
    position: absolute;
    opacity: 0;
    width: 15px;
    height: 15px;
    transform: translateX(5px);
  }

  &.checkbox:before, &.checkbox:after {
    border-radius: 5px;
  }

  &.radio:before, &.radio:after {
    border-radius: 50%;
  }


  &.isActive:after {
    opacity: 1;
    background-color: ${props => props.theme.colors.activeQuizAnswer};
  }

  &.isError, &.isError:after {
    opacity: 1;
    background-color: ${props => props.theme.colors.incorrectQuizAnswer};
  }

  &.isCorrect, &.isCorrect:after {
    opacity: 1;
    background-color: ${props => props.theme.colors.correctQuizAnswer};
  }

  &.isDisabled {
    cursor: auto;
  }
`;
