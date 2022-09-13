import React from 'react';
import { ThemeProvider } from 'styled-components';


export const lightTheme = {
  colors: {
    codeBg: '#f6f7f8',
    border: '#c4c6ca',
    paragraph: '#1c1e21',
    link: '#764abc',
    bg: '#ffffff',
    sideMenu: '#525862',
    svg: '#7f7f7f',
    listItemHover: '#f5f5f5',
    alertBorder: '#d9534f',
    alertBg: '#fff2f2',
    successBorder: '#00bf88',
    successBg: '#f1fdf9',
    infoBg: '#e5f3fe',
    infoBorder: '#0085f2',
    inputBg: '#ebedf0',
    inputBorder: '#764abc',
    tagBorder: '#764abc',
    buttonSubtitle: '#525860',
    contextMenuHover: '#e5e7e6',
    newPostBg: '#efefef',
    editorBg: '#fff'
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
