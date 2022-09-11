import styled from 'styled-components';

export const NewPostPageStyled = styled.div`
  display: flex;
  padding: 10px 20px 0;
  width: 100vw;

  &> * {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    position: relative;
    border: 1px solid ${props => props.theme.colors.border};
  }
  & > *:before {
    content: attr(data-title);
    padding: 5px;
    text-align: center;
    color: ${props => props.theme.colors.paragraph};
    border-bottom: 1px solid  ${props => props.theme.colors.border};
  }

  textarea {
    resize: none;
    border: none;

    outline: none;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    height: 100%;
  }
`;

export const TextareaContainer = styled.div`
  height: calc(100vh - 10px - 50px);
  
  .buttons {
    display: flex;
    height: 90px;
    gap: 20px;
    margin-top: 5px;
    padding: 0 10px 10px;
  }

`;

export const Preview = styled.div`
  width: 300px;
  height: calc(100vh - 10px - 50px);
  overflow: auto;
  border-left: none;
  .content {
    padding: 15px;
  }
`;