import styled from 'styled-components';

export const TagsStyled = styled.div`
  width: 100%;
  align-items: flex-start;
  background-color: #fff;
  transition: .3s;
  box-sizing: border-box;
  max-width: 500px;

  .container {
    margin: 10px;
  }

  input {
    margin-bottom: 10px;
  }

`;
export const NewTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  list-style-type: none;
  max-height: 100px;
  overflow: auto;
  margin-bottom: 10px;

  .tag {
    display: flex;
    align-items: center;
    border: 1px solid ${props => props.theme.colors.tagBorder};
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    overflow: auto;
    word-break: break-word;

    span {
      margin-left: 5px;
    }
  }
`;
