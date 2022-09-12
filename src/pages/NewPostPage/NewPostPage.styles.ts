import styled from 'styled-components';

export const NewPostPageStyled = styled.div`
  display: flex;
  padding: 10px 20px 0;
  width: 100vw;
  height: calc(100vh - 50px - 20px);
  transition: .3s;
  
  @media (max-width: 1000px) {
    width: 200%;
    padding: 0 0 10px;
    &>div {
     border: none;
    }
    &.show-preview {
      transform: translateX(-50%);
    }
    
  }

  &> * {
    display: flex;
    flex-direction: column;
    width: 50%;
    position: relative;
    border: 1px solid ${props => props.theme.colors.border};
  }
  & > *:before {
    content: attr(data-title);
    padding: 5px;
    height: 20px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.colors.paragraph};
    border-bottom: 1px solid  ${props => props.theme.colors.border};
  }
`;


export const Preview = styled.div`
  border-left: none;
  height: 100%;
  .content {
    overflow: auto;
    padding: 15px;
  }
`;

export const PhoneButton = styled.button`
  position: fixed;
  right: 0;
  height: 29px;
  font-size: 16px;
  top: 50px;
  padding: 0 10px;
  z-index: 5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;