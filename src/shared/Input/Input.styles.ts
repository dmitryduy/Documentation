import styled from 'styled-components';

export const InputStyled = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.border};
  width: 100%;
  padding-bottom: 10px;

  input {
    outline: none;
    border: none;
    font-size: 16px;
    width: 100%;
    background-color: inherit;
    color: ${props => props.theme.colors.paragraph};
  }
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 13px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.paragraph};
  letter-spacing: 1px;
`;
