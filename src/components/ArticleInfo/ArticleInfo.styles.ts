import styled from 'styled-components';

export const ArticleInfoStyled = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

export const Label = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.codeBg};
  color: ${props => props.theme.colors.paragraph};
  text-align: center;
  
  span {
    display: block;
    font-weight: bold;
  }
`;