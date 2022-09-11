import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: transparent;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  padding: 10px;

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
  }

  &:hover {
    border: 1px solid ${props => props.theme.colors.link};
  }
`;
