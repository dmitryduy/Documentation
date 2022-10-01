import { apiFunctionMutation, apiFunctionQuery } from '../index';

import { AuthMeResponse, SignInResponse, SignUpRequest, SignUpResponse, SignInRequest } from './userApi.typings';

export const userAPI = {
  authMe: apiFunctionQuery<AuthMeResponse>('/auth/me'),
  signIn: apiFunctionMutation<SignInRequest, SignInResponse>('post', '/login'),
  signUp: apiFunctionMutation<SignUpRequest, SignUpResponse>('post', '/register')
};