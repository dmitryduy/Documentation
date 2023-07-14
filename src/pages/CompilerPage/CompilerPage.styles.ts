import styled from 'styled-components';

export const CompilerPageStyled = styled.div`
  height: 100%;
  padding: 25px 20px 10px;
`;
export const Editor = styled.div`
  display: grid;
  position: relative;
  gap: 10px;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  &:before {
    position: absolute;
    content: 'Редактор';
    transform: translateY(-120%);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #7f7f7f;
  }

  .cm-editor {
    font-size: 18px;
    border-radius: 5px;
    overflow: auto;
    background-color: ${props => props.theme.colors.editorBg};
    box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  }
`;

export const Preview = styled.div`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 85px);
  color: ${props => props.theme.colors.paragraph};
  
`;

export const Task = styled.div`
  background-color: ${props => props.theme.colors.editorBg};
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  margin-bottom: 15px;
  max-height: 400px;
  overflow: auto;
`;

export const Frame = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.editorBg};
  border-radius: 5px;
  flex: 1;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  &:before {
    position: absolute;
    content: 'Консоль';
    transform: translateY(-120%);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #7f7f7f;
  }
  .preview {
    height: 100%;
    width: 100%;
    border: none;
  }
`;