import { IPost } from '../global.typings';
import axios from '../axios';

export const fetchPost = async (link: string):
Promise<{error: null | string, post: null | IPost}> => {
  const response = await axios.get(`/post/${link}`);
  return response.data;
};