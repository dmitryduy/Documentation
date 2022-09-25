import { ITagList } from '../global.typings';
import axios from '../axios';

export const fetchPostsList = async (): Promise<{error: null | string, tags: null | ITagList[]}> => {
  const response = await axios.get('/post-tags');
  return await response.data;
};