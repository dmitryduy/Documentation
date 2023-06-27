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
  &:hover, &.isActive {
    background-color: ${props => props.theme.colors.activeQuizAnswer};
  }
  &:before {
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.colors.quizBg};
    box-shadow: 2px 2px 2px 0 rgba(34, 60, 80, 0.2);
  }
  
  &:before, &:after{
    content: '';
    transition: opacity .2s;
  }
  
  &:after {
    position: absolute;
    opacity: 0;
    width: 15px;
    height: 15px;
  }
  
  &.checkbox:before {
    border-radius: 5px;
  }
  
  
  &.checkbox.isActive:after, &.radio.isActive:after {
    opacity: 1;
    border-radius: 2px;
    transform: translateX(5px);
    background-color: ${props => props.theme.colors.activeQuizAnswer};
  }

  &.isError.checkbox.isActive:after, &.mistake.radio.isActive:after {
    background-color: ${props => props.theme.colors.incorrectQuizAnswer};
  }
  
  &.radio.isActive:after {
    border-radius: 50%;
  }

  &.radio:before {
    border-radius: 50%;
  }
  
  &.isError {
    background-color: ${props => props.theme.colors.incorrectQuizAnswer};
  }
  
  &.isDisabled {
    cursor: auto;
  }
`;
