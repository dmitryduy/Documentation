import { apiFunctionMutation, apiFunctionQuery } from './index';

export interface AuthMeResponse {
  login: string | null;
}

export interface SignInRequest {
  password: string;
  login: string;
}

export interface SignInResponse {
  login: string;
  token: string;
}

export type SignUpRequest = SignInRequest;

export type SignUpResponse = SignInResponse;

export const userAPI = {
  authMe: apiFunctionQuery<AuthMeResponse>('/auth/me'),
  signIn: apiFunctionMutation<SignInRequest, SignInResponse>('post', '/login'),
  signUp: apiFunctionMutation<SignUpRequest, SignUpResponse>('post', '/register')
};