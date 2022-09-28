import axios from '../axios';

export const fetchLogin = async (password: string, login: string):
  Promise<{error: null | string, login: null | string, token: string | null}> => {
  const response = await axios.post('/login', {
    password,
    login
  });
  return await response.data;
};