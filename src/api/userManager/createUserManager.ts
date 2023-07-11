import { storage } from '@utils/storage';

import { ClientApiFactory } from '../clientAPI/clientApiFactory';

import { UserManager } from './userManager';

import { BASE_URL } from '@/constants';


export const createUserManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new UserManager(clientFactory.createAuthorizedClient(storage('auth-token').getItem()));
};