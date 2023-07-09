import styled from 'styled-components';

import { ButtonStyled } from '../../../shared/Button/Button.styles';

export const QuestionConstructorStyled = styled.div`
  border-right: 3px solid ${props => props.theme.colors.svg};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  .input {
    width: calc(100% - 10px);
  }
`;

export const Title = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;
  transition: .3s;
  min-height: 30px;
  
  &:before {
    position: absolute;
    right: 10px;
    transition: .3s;
    cursor: pointer;
    order: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
    width: 35px;
    height: 35px;
    background-color: ${props => props.theme.colors.codeBg};
    color: ${props => props.theme.colors.paragraph};
    counter-increment: section;
    content: counter(section);
  }
  
  &.active, &:hover {
    &:before {
      background-color: ${props => props.theme.colors.secondary};
    }
    p {
      color: ${props => props.theme.colors.secondary};
    }
  }
  p {
    transition: .3s;
    color: ${props => props.theme.colors.paragraph};
    font-weight: bold;
    font-size: 20px;
    margin-right: 60px;
  }
`;

export const ConstructorButton = styled(ButtonStyled)`
  margin-top: 10px;
  align-items: center !important;
  color: ${props => props.theme.colors.paragraph};
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Variants = styled.div`
  margin-right: 10px;
`;

export const AddVariant = styled.div`
  p{
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.theme.colors.svg};
    margin-bottom: 10px;
  }
`;

export const Options = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    font-size: 14px;
    color: ${props => props.theme.colors.paragraph};
  }
`;

export const CodeConstructor = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-top: 20px;
  
  .input {
    margin-top: 20px;
  }
`;