import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AuthMeResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  userAPI
} from '../../api/userApi/userAPI';
import { getAsyncActionMutation, getAsyncActionQuery } from '../getAsyncAction';

import { IAuthReducerState } from './authReducer.typings';

const initialState = {
  isLogin: false,
  login: null,
  loading: false,
} as IAuthReducerState;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected') && !action.type.startsWith('auth/authMe');
};

export const authMe = getAsyncActionQuery<AuthMeResponse>('auth/authMe', userAPI.authMe);

export const signIn = getAsyncActionMutation<SignInRequest, SignInResponse>('auth/signIn', userAPI.signIn);

export const signUp = getAsyncActionMutation<SignUpRequest, SignUpResponse>('auth/signUp', userAPI.signUp);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLogin = false;
      state.login = null;
      window.localStorage.removeItem('auth-token');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authMe.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.isLogin = !!action.payload.login;
      })
      .addCase(signIn.pending, state => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.isLogin = true;
        state.loading = false;
      })
      .addCase(signUp.pending, state => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.isLogin = true;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
      });
  }
});

export const {logout} = authSlice.actions;

export const {reducer: authReducer} = authSlice;