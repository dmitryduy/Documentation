import styled from 'styled-components';

export const ListStyled = styled.ul`
  padding-left: 20px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    padding-left: 10px;
  }

  li {
    position: relative;
    font-size: 17px;
    line-height: 25px;
    word-break: break-word;
    color: ${props => props.theme.colors.paragraph};
    @media (max-width: 500px) {
      font-size: 15px;
      line-height: 20px;
      margin-left: 10px;
    }
  }
`;
