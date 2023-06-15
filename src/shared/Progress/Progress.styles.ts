import styled from 'styled-components';

export const ProgressStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  border-radius: 5px;
  max-width: 100%;
  padding: 2px 0;
  margin: 5px 10px 0 10px;
  font-size: 10px;
  background-color: ${props => props.theme.colors.progressBg};
  color: ${props => props.theme.colors.paragraph};
  
  .progress {
    position: absolute;
    width: 50%;
    border-radius: inherit;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.colors.progressBar};
    opacity: .5;
    
    &.error {
      background-color: ${props => props.theme.colors.progressError};
    }
  }
`;
