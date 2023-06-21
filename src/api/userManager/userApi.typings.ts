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

export interface SignUpRequest extends SignInRequest {
  repeatPassword: string;
}

export type SignUpResponse = SignInResponse;