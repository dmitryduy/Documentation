import styled from 'styled-components';

export const PreviewStyled = styled.div`
  flex: 1;
  position: relative;
  width: 50%;
  background-color: ${props => props.theme.colors.editorBg};
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  margin-top: 15px;
  border-radius: 15px;
  overflow: hidden;

  @media (max-width: 1000px) {
    position: fixed;
    width: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    transition: .3s;
    transform-origin: bottom right;
    transform: scale(0);
    &.active {
      transform: scale(1);
    }
    z-index: 10000;

    .content {
      margin-top: 25px;
    }
  }

  &:before {
    position: absolute;
    content: 'Превью';
    transform: translateY(-120%);
    font-size: 14px;
    left: 0;
    font-weight: bold;
    color: #7f7f7f;
    background-color: ${props => props.theme.colors.newPostBg};
    width: 100%;
    text-align: start;
  }

  .content {
    height: 100%;
    overflow: auto;
    padding: 10px;
  }
`;

export const HidePreviewButton = styled.button`
  position: absolute;
  top: 0;
  outline: none;
  padding: 0 10px;
  right: 0;
  font-size: 30px;
  border: none;
  color: ${props => props.theme.colors.svg};
  background-color: transparent;
  border-top-right-radius: 15px;
`;