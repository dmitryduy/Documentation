import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { Errors } from '../../errors';

export class ClientAPI {
  constructor(
    private readonly baseUrl: string,
    private readonly headers: AxiosRequestHeaders,
    private readonly authToken?: string | null) {
  }

  public async get<TRes>(endpoint: string, params?: AxiosRequestConfig['params']): Promise<TRes> {
    try {
      const client = this.createClient(params);
      const response = await client.get<TRes>(endpoint);
      return response.data;
    } catch (e) {
      this.handleError(e);
    }
  }

  public async mutate<TReq, TRes>(endpoint: string, data: TReq, method: 'post' | 'delete' | 'put'): Promise<TRes> {
    try {
      const client = this.createClient();
      const response = await client(endpoint, {data, method});
      return response.data;
    } catch (e) {
      this.handleError(e);
    }
  }

  private createClient(params: object = {}): AxiosInstance {
    const config: AxiosRequestConfig = {
      params,
      headers: this.headers || {},
      baseURL: this.baseUrl
    };

    if (this.authToken) {
      config.headers!.Authorization = `Bearer ${this.authToken}`;
    }

    return axios.create(config);
  }

  private handleError(e: unknown): never {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<{ error: string }>;
      if (error.code === 'ERR_NETWORK') {
        throw new Error(Errors.NO_CONNECTION);
      }
      throw new Error(error.response?.data?.error || Errors.UNEXPECTED_ERROR);
    }
    throw new Error(Errors.UNEXPECTED_ERROR);
  }
}