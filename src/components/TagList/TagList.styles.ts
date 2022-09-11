import styled from 'styled-components';

export const TagListStyled = styled.div`
  .article-list {
    padding: 5px 0;
    font-size: 18px;
    transition: .4s;
    overflow: hidden;
    @media (max-width: 1000px) {
      font-size: 16px;
      padding: 0;
    }
  }
  .article-title {
    padding: 5px 0 5px 12px;
    margin-left: 15px;
    margin-right: 10px;
    transition: .1s;
    border-radius: 5px;
    cursor: pointer;
    @media (max-width: 1000px) {
      margin-left: 10px;
      margin-right: 15px;
    }
    &:hover {
      background-color: ${props => props.theme.colors.listItemHover};
    }
    
  }
  a {
    display: block;
    color: ${props => props.theme.colors.paragraph};
    width: 100%;
  }
  a:visited{
    color: ${props => props.theme.colors.link};
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
  @media (max-width: 1000px) {
    padding: 5px;
    margin: 0 5px;
  }
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
    @media (max-width: 1000px) {
      font-size: 16px;
    }
    
  }

  svg {
    transform: rotate(-90deg);
    transition: .4s;
    fill: ${props => props.theme.colors.svg};
  }
`;