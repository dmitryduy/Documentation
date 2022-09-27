import styled from 'styled-components';

export const TagsStyled = styled.div`
  width: 100%;
  transition: .3s;
  box-sizing: border-box;
  max-height: 0;
  background-color: ${props => props.theme.colors.tagBg};

  .container {
    margin: 10px;
  }

  input {
    flex: 1;
    padding: 0 5px;
    border: none;
    outline: none;
    font-size: 16px;
    margin-top: 5px;
    background-color: ${props => props.theme.colors.tagBg};
    min-width: 100px;
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
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    overflow: auto;
    word-break: break-word;
    font-size: 16px;

    span {
      margin-left: 5px;
    }
  }
`;
