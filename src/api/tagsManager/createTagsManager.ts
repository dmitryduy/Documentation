import { ClientApiFactory } from '../clientAPI/clientApiFactory';
import { BASE_URL } from '../../constants';

import { TagsManager } from './tagsManager';

export const createTagsManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new TagsManager(clientFactory.createClient());
};