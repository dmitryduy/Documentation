import styled from 'styled-components';

export const NewPostPageStyled = styled.div`
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


export const Preview = styled.div`
  flex: 1;
  position: relative;
  width: 50%;
  background-color: ${props => props.theme.colors.editorBg};
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  margin-top: 15px;
  border-radius: 15px;
  padding: 15px;

  @media (max-width: 1000px) {
    position: fixed;
    top: 60px;
    height: calc(100vh - 50px - 35px);
    transform-origin: bottom right;
    transform: scale(.15);
    width: calc(100% - 10px);
    right: 0;
    transition: .3s;
    border: 1px solid #000;

    a {
      pointer-events: none;
    }

    .content {
      margin-top: 15px;
    }

    &.active {
      border: none;
      transform: scale(1);
      left: 5px;
    }

    &.active a {
      pointer-events: auto;
    }
  }

  &:before {
    position: absolute;
    content: 'Превью';
    transform: translateY(calc(-120% - 15px));
    font-size: 14px;
    font-weight: bold;
    color: #7f7f7f;
    background-color: ${props => props.theme.colors.newPostBg};
    width: 100%;
    text-align: start;
  }

  .content {
    height: 100%;
    overflow: auto;
  }
`;

export const PreviewButton = styled.button`
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