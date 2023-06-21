import { ClientAPI } from '../clientAPI/clientAPI';

import { GetAllTagsResponse } from './tagsApi.typings';

export class TagsManager {
  constructor(private readonly clientAPI: ClientAPI) {}

  public async getAll(): Promise<GetAllTagsResponse> {
    return await this.clientAPI.get('/post-tags');
  }
}