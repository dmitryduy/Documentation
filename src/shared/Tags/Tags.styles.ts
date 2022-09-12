import styled from 'styled-components';

export const TagsStyled = styled.div`
  position: fixed;
  top: 50px;
  z-index: 10;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: .3s;
  transform: translateY(-100%);
  visibility: hidden;

  &.visible {
    transform: translateY(0);
    visibility: visible;
  }

`;
export const NewTags = styled.ul`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 5px;
  .tag {
    position: relative;
    border: 1px solid ${props => props.theme.colors.tagBorder};
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      border: 1px solid ${props => props.theme.colors.alertBg};
      background-color:  ${props => props.theme.colors.alertBg};
    }
  }
`;


export const InputWrapper = styled.div`
display: flex;
  align-items: center;
  gap: 10px;
  input {
    flex: 1;
  }
  button {
    flex: 0;
  }
`;