import styled from 'styled-components';

export const ListStyled = styled.ul`
  padding-left: 20px;
  @media (max-width: 500px) {
    padding-left: 5px;
  }
  li {
    position: relative;
    font-size: 17px;
    line-height: 25px;
    margin-bottom: 20px;
    @media (max-width: 500px) {
      font-size: 15px;
      margin-bottom: 10px;
      line-height: 20px;
    }
  }
`;
