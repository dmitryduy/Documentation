import { checkRegisterData } from '@pages/RegisterPage/RegisterPage.utils/checkRegisterData';

import { ClientAPI } from '../clientAPI/clientAPI';

import { AuthMeResponse, SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './userApi.typings';

import { Errors } from '@/errors';

export class UserManager {
  constructor(private readonly clientAPI: ClientAPI) {}

  public async authMe(): Promise<AuthMeResponse> {
    return await this.clientAPI.get('/auth/me');
  }

  public async signIn(data: SignInRequest): Promise<SignInResponse> {
    const login = data.login.trim();
    const password = data.password.trim();
    if (!login || !password) {
      throw new Error(Errors.EMPTY_LOGIN_OR_PASSWORD_ERROR);
    }

    return await this.clientAPI.mutate('/login', data, 'post');
  }

  public async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const login = data.login.trim();
    const password = data.password.trim();
    const repeatPassword = data.repeatPassword.trim();

    const error = checkRegisterData(login, password, repeatPassword);
    if (error) {
      throw new Error(error);
    }

    return await this.clientAPI.mutate('/register', data, 'post');
  }
}