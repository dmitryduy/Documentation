import { ITagList } from '../global.typings';

import { apiFunctionQuery } from './index';

export interface GetAllTagsResponse {
  tags: ITagList[]
}

export const tagsApi = {
  getAll: apiFunctionQuery<GetAllTagsResponse>('/post-tags')
};