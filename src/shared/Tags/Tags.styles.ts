import styled from 'styled-components';

export const TagsStyled = styled.div`
  width: 100%;
  transition: .3s;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${props => props.theme.colors.tagBg};

  .container {
    margin: 10px;
  }
  input {
    width: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
    font-size: 16px;
    margin-top: 5px;
    background-color: ${props => props.theme.colors.tagBg};
    min-width: 100px;
    color: ${props => props.theme.colors.paragraph};
  }
  
`;
export const NewTags = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 5px;
  list-style-type: none;
  flex-wrap: wrap;

  .tag {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    overflow: auto;
    word-break: break-word;
    font-size: 16px;
    color: ${props => props.theme.colors.paragraph};
    background-color: ${props => props.theme.colors.background};

    span {
      margin-left: 5px;
    }
  }

  .tooltip {
    width: fit-content;
    color: ${props => props.theme.colors.paragraph};
    background-color: ${props => props.theme.colors.border};
    cursor: pointer;
    .add {
      margin-left: 0;
      margin-right: 5px;
      color: ${props => props.theme.colors.link};
    }
  }
  
  
`;