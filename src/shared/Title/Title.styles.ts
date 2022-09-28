import styled from 'styled-components';

export const TitleStyled = styled.h1`
  width: fit-content;
  margin-bottom: 20px;
  font-size: 40px;
  color: ${props => props.theme.colors.paragraph};
  word-break: break-word;
  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
