import { ClientApiFactory } from '../clientAPI/clientApiFactory';
import { BASE_URL } from '../../constants';
import { storage } from '../../utils/storage';

import { UserManager } from './userManager';

export const createUserManager = () => {
  const clientFactory = new ClientApiFactory(BASE_URL);
  return new UserManager(clientFactory.createAuthorizedClient(storage('auth-token').getItem()));
};