import styled from 'styled-components';

export const InfoAsideStyled = styled.aside`
  position: fixed;
  width: 300px;
  top: 50px;
  height: calc(100vh - 50px);
  padding: 10px 0;
  left: 0;
  border-right: 1px solid ${props => props.theme.colors.border};
`;
