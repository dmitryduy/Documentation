import styled from 'styled-components';

export const EditorWithPreviewStyled = styled.div`
  display: flex;
  padding: 10px 20px;
  gap: 15px;
  width: 100vw;
  height: calc(100vh - 50px);
  transition: .3s;
  background-color: ${props => props.theme.colors.newPostBg};
  @media (max-width: 1000px) {
    padding: 10px 10px;
  }
`;
