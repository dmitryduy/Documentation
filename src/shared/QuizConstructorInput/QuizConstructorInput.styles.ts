import styled from 'styled-components';

export const QuizConstructorInputStyled = styled.div`
  margin-bottom: 20px;
  label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.theme.colors.svg};
  }
  p {
    margin-bottom: 10px;
  }
`;
