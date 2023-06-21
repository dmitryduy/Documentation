import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { storage } from '../../utils/storage';

import { IAuthReducerState } from './authReducer.typings';

const initialState = {
  isLogin: false,
  login: null,
  loading: false,
} as IAuthReducerState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLogin = false;
      state.login = null;
      storage('auth-token').removeItem();
    },
    setUser(state, action: PayloadAction<{login: string | null}>) {
      state.login = action.payload.login;
      state.isLogin = !!action.payload.login;
    }
  },
});

export const {logout, setUser} = authSlice.actions;

export const {reducer: authReducer} = authSlice;