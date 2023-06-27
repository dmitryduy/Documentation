import styled from 'styled-components';
import { rgba } from 'polished';

export const SelectStyled = styled.div`
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.colors.svg};
  margin-bottom: 10px;
`;

export const Options = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  list-style: none;
  margin-right: 10px;
  margin-bottom: 20px;
  li {
    border-radius: 5px;
    transition: .2s;
    color: ${props => props.theme.colors.paragraph};
    background-color: ${props => rgba(props.theme.colors.codeBg, .2)};
    padding: 10px;
    cursor: pointer;
    &.active {
      background-color: ${props => props.theme.colors.codeBg};
    }
  }
`;