import { ClientApiFactory } from '../clientAPI/clientApiFactory';
import { BASE_URL } from '../../constants';
import { storage } from '../../utils/storage';

import { PostManager } from './postManager';

export const createPostManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new PostManager(clientFactory.createAuthorizedClient(storage('auth-token').getItem()));
};