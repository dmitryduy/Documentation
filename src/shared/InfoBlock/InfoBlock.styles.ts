import styled from 'styled-components';

export const InfoBlockStyled = styled.div`
  border-radius: 5px;
  padding: 20px 20px 10px;
  margin: 15px 0;
  word-wrap: break-word;
  box-shadow: 1px 1px 4px 0 rgba(34, 60, 80, 0.2);

  @media (max-width: 500px) {
    padding: 10px;
    margin: 5px 0;
  }
  &.alert {
    background-color: ${props => props.theme.colors.alertBg};
    border-left: 6px solid ${props => props.theme.colors.alertBorder};
  }
  &.tip {
      background-color: ${props => props.theme.colors.tipBg};
      border-left: 6px solid ${props => props.theme.colors.tipBorder};
    .marker {
      background-color: ${props => props.theme.colors.tipMarker};
      border: 1px solid ${props => props.theme.colors.tipMarkerBorder};
    }
    }
  &.info {
    background-color: ${props => props.theme.colors.infoBg};
    border-left: 6px solid ${props => props.theme.colors.infoBorder};
    .marker {
      background-color: ${props => props.theme.colors.infoMarker};
      border: 1px solid ${props => props.theme.colors.infoMarkerBorder};
    }
  }
  
  &.caution {
    background-color: ${props => props.theme.colors.cautionBg};
    border-left: 6px solid ${props => props.theme.colors.cautionBorder};
    .marker {
      background-color: ${props => props.theme.colors.cautionMarker};
      border: 1px solid ${props => props.theme.colors.cautionMarkerBorder};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .title {
    text-transform: uppercase;
    margin-left: 10px;
    font-weight: bold;
    color: ${props => props.theme.colors.paragraph};
    word-break: break-word;
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colors.paragraph};
  }
`;