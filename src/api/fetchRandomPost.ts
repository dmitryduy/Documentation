import { IPost } from '../global.typings';
import axios from '../axios';

export const fetchRandomPost = async (): Promise<{error: null | string, post: null | IPost}> => {
  const response = await axios.get('/random');

  return await response.data;
};