import styled from 'styled-components';

export const CodeStyled = styled.div`
  position: relative;
  .copy-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colors.paragraph};
    cursor: pointer;
  }
  
  code {
    user-select: none;
  }
  &.canCopy code {
    user-select: auto;
  }
`;
