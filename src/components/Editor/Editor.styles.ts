import styled from 'styled-components';

export const EditorStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 50%;
  background-color: ${props => props.theme.colors.editorBg};
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  margin-top: 15px;
  border-radius: 15px;
  transition: .3s;
  
  
  @media (max-width: 1000px) {
    width: 100%;
  }
  
  &:before {
    position: absolute;
    content: 'Редактор';
    transform: translateY(-120%);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #7f7f7f;
  }
  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 5px;
    padding: 0 10px 10px;
  }

  textarea {
    background-color: ${props => props.theme.colors.editorBg};
    border: 1px solid ${props => props.theme.colors.border};
    border-left: none;
    border-right: none;
    resize: none;
    outline: none;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    flex: 1;
    
  }
`;
