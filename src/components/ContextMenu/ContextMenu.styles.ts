import styled from 'styled-components';

export const ContextMenuStyled = styled.div`
  position: fixed;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 50px 0 rgba(34, 60, 80, 0.3);
  top: 500px;
  z-index: 2;
  border-radius: 5px;
  background-color: #fff;
  opacity: 0;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }
  
`;

export const Row = styled.ul`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  padding-bottom: 10px;
  
  &:first-child {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
  
  .marker, .code {
    background-color: ${props => props.theme.colors.codeBg};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.paragraph};
  }
  
  svg {
    transform: scale(.8);
  }

  svg, code, path, strong, i {
    pointer-events: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s;
    list-style-type: none;
    font-size: 16px;
    min-width: 30px;
    text-align: center;

    &:hover {
      background-color: ${props => props.theme.colors.contextMenuHover};
    }
  }
`;