import styled from 'styled-components';

export const SecondTitleStyled = styled.h3`
  padding-top: 60px;
  margin-top: -60px;
  margin-bottom: 15px;
  font-size: 25px;
  color: ${props => props.theme.colors.paragraph};
  word-break: break-word;
  pointer-events: none;
  @media (max-width: 500px) {
    font-size: 17px;
    margin-bottom: 5px;
    line-height: 20px;
  }
`;
