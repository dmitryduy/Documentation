import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISettingsReducerState } from './settingsReducer.typings';

const initialState = {
  theme: window.localStorage.getItem('theme') || 'dark',
} as ISettingsReducerState;

const settingsSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('theme', state.theme);
    }
  }
});

export const {changeTheme} = settingsSlice.actions;

export const {reducer: settingsReducer} = settingsSlice;