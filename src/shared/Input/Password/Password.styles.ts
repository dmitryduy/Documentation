import styled from 'styled-components';

export const PasswordStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  input {
    padding-right: 90px;
  }
  .show-button {
    position: absolute;
    right: 0;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.colors.link};
    cursor: pointer;
    user-select: none;
  }
`;
