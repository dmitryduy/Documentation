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