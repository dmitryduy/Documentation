import styled from 'styled-components';

export const SubtitleStyled = styled.h2`
  font-size: 30px;
  padding-top: 60px;
  margin-top: -60px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.paragraph};
  word-break: break-word;
  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;
