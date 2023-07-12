import styled from 'styled-components';

export const TaskEditorStyled = styled.div`
  margin-bottom: 20px;
`;

export const Editor = styled.div`
display: flex;
  flex-direction: column;
  width: 100%;
  
  #js {
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .ace_mobile-button {
    display: none;
  }
`;

export const Preview = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.paragraph};
  height: 300px;
  .preview {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #000;
    border-radius: 5px;
  }
`;