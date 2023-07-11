import React from 'react';
import { ThemeProvider } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks/useStores';

const colors = {
  primary: '#64c9c5'
};

export const lightTheme = {
  colors: {
    secondary: '#2db37d',
    primary: '#64c9c5',
    headerBg: '#fff',
    background: '#fff',
    codeBg: '#f6f7f8',
    border: '#c4c6ca',
    paragraph: '#1c1e21',
    link: colors.primary,
    sideMenu: '#525862',
    svg: '#7f7f7f',
    listItemHover: '#f5f5f5',
    alertBorder: '#d9534f',
    alertBg: '#ffebec',
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
    authButton: colors.primary,
    searchResultsBg: '#efefef',
    deletion: '#d9534f',
    scrollBar: '#f1f1f1',
    thumb: '#c0c0c0',
    progressBg: '#e9e8ed',
    progressBar: colors.primary,
    progressError: '#e13238',
    quizBg: '#f6f7f8',
    activeQuizAnswer: '#0fd9de',
    incorrectQuizAnswer: '#d9534f',
    correctQuizAnswer: '#50a14f'
  }
};

export const darkTheme = {
  colors: {
    secondary: '#2db37d',
    primary: '#64c9c5',
    headerBg: '#242526',
    background: '#1b1b1d',
    codeBg: '#323234',
    border: '#444950',
    paragraph: '#fff',
    link: colors.primary,
    sideMenu: '#fff',
    svg: '#7f7f7f',
    listItemHover: '#272729',
    alertBorder: '#e13238',
    alertBg: '#4b1113',
    tipMarker: '#004200',
    tipMarkerBorder: '#004200',
    tipBorder: '#009400',
    tipBg: '#003100',
    cautionMarker: '#684c00',
    cautionMarkerBorder: '#684c00',
    cautionBorder: '#e6a700',
    cautionBg: '#4d3800',
    infoMarker: '#5f5f61',
    infoMarkerBorder: '#5f5f61',
    infoBg: '#474748',
    infoBorder: '#d4d5d8',
    inputBg: '#eef9fd',
    inputBorder: colors.primary,
    tagBg: '#242526',
    buttonSubtitle: '#fff',
    contextMenuHover: '#242526',
    newPostBg: '#1b1b1d',
    editorBg: '#242526',
    selection: colors.primary,
    tableEven: '#2b2b2d',
    authButton: colors.primary,
    searchResultsBg: '#1c1e21',
    deletion: '#d9534f',
    scrollbar: '#444444',
    thumb: '#686868',
    progressBg: '#444444',
    progressBar: colors.primary,
    progressError: '#e13238',
    quizBg: '#323234',
    activeQuizAnswer: '#0fd9de',
    incorrectQuizAnswer: '#d9534f',
    correctQuizAnswer: '#50a14f'
  }
};

interface IThemeProps {
  children: React.ReactNode;
}

const Theme: React.FC<IThemeProps> = observer(({children}) => {
  const {settingsStore: {theme}} = useStores();
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
});

export default Theme;
