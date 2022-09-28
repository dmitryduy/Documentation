import styled from 'styled-components';

export const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
  max-width: 400px;
  margin: 60px auto 0;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);

  a {
    align-self: center;
    color: ${props => props.theme.colors.border};
  }
`;
