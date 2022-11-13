import styled from 'styled-components';

export const ArticleInfoStyled = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

export const Label = styled.span`
  padding: 10px 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.codeBg};
  color: ${props => props.theme.colors.paragraph};
`;