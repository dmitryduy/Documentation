import axios from '../axios';

export const authMe = async ():
  Promise<{error: null | string, auth: boolean, login: null | string}> => {
  const response = await axios.get('/auth/me');
  return await response.data;
};