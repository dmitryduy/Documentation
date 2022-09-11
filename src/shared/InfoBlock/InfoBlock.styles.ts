import styled from 'styled-components';

export const InfoBlockStyled = styled.div`
  border-radius: 5px;
  padding: 20px;
  margin: 15px 0;
  &.alert {
    background-color: ${props => props.theme.colors.alertBg};
    border-left: 6px solid ${props => props.theme.colors.alertBorder};
  }
  &.tip {
      background-color: ${props => props.theme.colors.successBg};
      border-left: 6px solid ${props => props.theme.colors.successBorder};
    }
  &.info {
    background-color: ${props => props.theme.colors.infoBg};
    border-left: 6px solid ${props => props.theme.colors.infoBorder};
  }
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 10px;
  .title {
    text-transform: uppercase;
    margin-left: 10px;
    font-weight: bold;
    color: ${props => props.theme.colors.paragraph};
  }
`;