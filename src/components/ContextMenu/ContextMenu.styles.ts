import styled from 'styled-components';

export const ContextMenuStyled = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.editorBg};
  top: 500px;
  justify-content: space-between;
  overflow-x: auto;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px 15px 0 0;
  user-select: none;
}

li {
  padding: 5px 15px;
  cursor: pointer;
  transition: .3s;
  list-style-type: none;
  font-size: 16px;
  text-align: center;
  border-right: 1px solid ${props => props.theme.colors.border};
  flex: 1;
  white-space: nowrap;
  color: ${props => props.theme.colors.paragraph};

  &.delete {
    text-decoration: line-through;
  }
  &.strong {
    font-weight: bold;
  }

  &.italic {
    font-style: italic;
  }

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.contextMenuHover};
  }
`;