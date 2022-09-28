import axios from '../axios';

export const fetchRegister = async (password: string, login: string):
  Promise<{error: null | string, login: null | string, token: string | null}> => {
  const response = await axios.post('/register', {
    password,
    login
  });
  return await response.data;
};