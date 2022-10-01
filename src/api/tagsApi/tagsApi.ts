import { apiFunctionQuery } from '../index';

import { GetAllTagsResponse } from './tagsApi.typings';

export const tagsApi = {
  getAll: apiFunctionQuery<GetAllTagsResponse>('/post-tags')
};