import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthReducerState } from './authReducer.typings';

const initialState = {
  isLogin: false,
  login: null
} as IAuthReducerState;

const authSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<string>) {
      state.login = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.login = null;
      window.localStorage.removeItem('auth-token');
    }
  }
});

export const {loginUser, logout} = authSlice.actions;

export const {reducer: authReducer} = authSlice;