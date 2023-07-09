import styled from 'styled-components';

export const SwitcherStyled = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  width: 34px;
  height: 16px;
  background-color: ${props => props.theme.colors.border};
  border-radius: 10px;
  margin-bottom: 10px;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: -4px;
    left: -5px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.border};
    border: 2px solid ${props => props.theme.colors.svg};
    transition: .3s;
  }

  &.isActive {
    background-color: ${props => props.theme.colors.primary};
    &:after {
      left: calc(24px - 2px - 10px);
      background-color: ${props => props.theme.colors.primary};
      border: 2px solid  ${props => props.theme.colors.svg};
    }
  }
`;

export const SwitcherContainer = styled.div`
  p {
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.theme.colors.svg};
    margin-bottom: 10px;
  }
`;