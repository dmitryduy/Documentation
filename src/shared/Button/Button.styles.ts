import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: transparent;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 5px;
  display: flex;
  padding: 5px 10px;
  
  &:disabled {
    cursor: default;
  }

  &:first-child {
    align-items: flex-start;
  }

  &:last-child {
    align-items: flex-end;
  }

  flex-direction: column;
  font-size: 20px;
  cursor: pointer;
  transition: .1s;

  .subtitle {
    color: ${props => props.theme.colors.buttonSubtitle};
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .text {
    color: ${props => props.theme.colors.link};
    font-size: 17px;
    font-weight: bold;
    text-align: right;
    margin-top: auto;
  }

  &:not(:disabled):hover {
    border: 1px solid ${props => props.theme.colors.link};
  }
  
  @media (max-width: 500px) {
    .text, .subtitle {
      font-size: 14px;
    }
  }
`;
