import styled from 'styled-components';

import { ButtonStyled } from '../Button/Button.styles';

export const QuizStyled = styled.div`
  background-color: ${props => props.theme.colors.quizBg};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const QuizSubtitle = styled.p`
  text-align: center;
  font-weight: 500;
  color: ${props => props.theme.colors.paragraph};
`;

export const QuizTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.paragraph};
  margin-bottom: 20px;
  overflow: auto;
`;

export const QuizButton = styled(ButtonStyled)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.link};
  &:last-child{
    align-items: center;
  }
`;