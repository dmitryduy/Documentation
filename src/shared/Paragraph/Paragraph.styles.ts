import styled from 'styled-components';

export const ParagraphStyled = styled.p`
  color: ${props => props.theme.colors.paragraph};
  font-size: 17px;
  line-height: 25px;
  margin-bottom: 15px;
  word-break: break-word;
  @media (max-width: 500px) {
    font-size: 15px;
    margin-bottom: 10px;
    line-height: 20px;
  }
`;
