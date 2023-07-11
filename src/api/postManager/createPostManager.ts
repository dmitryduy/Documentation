import { storage } from '@utils/storage';

import { ClientApiFactory } from '../clientAPI/clientApiFactory';

import { PostManager } from './postManager';

import { BASE_URL } from '@/constants';


export const createPostManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new PostManager(clientFactory.createAuthorizedClient(storage('auth-token').getItem()));
};