import React from 'react';
import { ThemeProvider } from 'styled-components';

const colors = {
  primary: '#64c9c5'
};

export const lightTheme = {
  colors: {
    codeBg: '#f6f7f8',
    border: '#c4c6ca',
    paragraph: '#1c1e21',
    link: colors.primary,
    bg: '#ffffff',
    sideMenu: '#525862',
    svg: '#7f7f7f',
    listItemHover: '#f5f5f5',
    alertBorder: '#d9534f',
    alertBg: '#fff2f2',
    tipMarker: '#c4e9c4',
    tipMarkerBorder: '#b0d1b0',
    tipBorder: '#009400',
    tipBg: '#e6f6e6',
    cautionMarker: '#ffefc4',
    cautionMarkerBorder: '#e5d7b0',
    cautionBorder: '#e6a700',
    cautionBg: '#fff8e6',
    infoMarker: '#d8f2fa',
    infoMarkerBorder: '#c2d9e1',
    infoBg: '#e5f3fe',
    infoBorder: '#4cb3d4',
    inputBg: '#eef9fd',
    inputBorder: colors.primary,
    tagBg: '#f3f5f9',
    buttonSubtitle: '#525860',
    contextMenuHover: '#e5e7e6',
    newPostBg: '#efefef',
    editorBg: '#fff',
    selection: colors.primary,
    tableEven: '#f5f6f7',
  }
};

interface IThemeProps {
  children: React.ReactNode;
}

const Theme: React.FC<IThemeProps> = ({children}) => {

  return (
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
