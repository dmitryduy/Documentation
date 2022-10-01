import { createSlice } from '@reduxjs/toolkit';

import { storage } from '../../utils/storage';

import { ISettingsReducerState } from './settingsReducer.typings';

const initialState = {
  theme: storage('theme').getItem() || 'dark',
} as ISettingsReducerState;

const settingsSlice = createSlice({
  name: 'settings',
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