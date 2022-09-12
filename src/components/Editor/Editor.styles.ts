import styled from 'styled-components';

export const EditorStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  position: relative;
  border: 1px solid ${props => props.theme.colors.border};

  &:before {
    content: 'Редактор';
    padding: 5px;
    height: 20px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.colors.paragraph};
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 5px;
    padding: 0 10px 10px;
  }

  textarea {
    resize: none;
    border: none;
    outline: none;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    flex: 1;
  }
`;
