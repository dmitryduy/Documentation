import styled from 'styled-components';

export const TagListStyled = styled.div`
  .article-list {
    padding: 5px 0;
    font-size: 18px;
    transition: .4s;
    overflow: hidden;
  }
  .article-title {
    padding: 5px 0 5px 12px;
    margin-left: 15px;
    margin-right: 10px;
    transition: .1s;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.colors.listItemHover};
    }
    
    a {
      color: ${props => props.theme.colors.paragraph};
    }
    a:visited{
      color: ${props => props.theme.colors.link};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 10px;
  margin: 0 10px;
  transition: .1s;
  border-radius: 5px;
  cursor: pointer;
  &.active {
    svg {
      transform: rotate(0);
    }
  }
  &:hover {
    background-color: ${props => props.theme.colors.listItemHover};
  }
  .tag {
    color: ${props => props.theme.colors.paragraph};
    font-size: 18px;
    
  }

  svg {
    transform: rotate(-90deg);
    transition: .4s;
    fill: ${props => props.theme.colors.svg};
  }
`;