import { AxiosRequestHeaders } from 'axios';

import { ClientAPI } from './clientAPI';

export class ClientApiFactory {
  constructor(private readonly baseUrl: string, private readonly headers: AxiosRequestHeaders = {}) {}

  public createClient(): ClientAPI {
    return new ClientAPI(this.baseUrl, this.headers);
  }

  public createAuthorizedClient(authToken: string | null): ClientAPI {
    return new ClientAPI(this.baseUrl, this.headers, authToken);
  }
}