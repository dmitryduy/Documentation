import { ClientApiFactory } from '../clientAPI/clientApiFactory';

import { TagsManager } from './tagsManager';

import { BASE_URL } from '@/constants';


export const createTagsManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new TagsManager(clientFactory.createClient());
};