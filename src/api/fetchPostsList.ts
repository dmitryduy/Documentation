import { ITagList } from '../global.typings';
import { BASE_URL } from '../global.constants';

export const fetchPostsList = async (): Promise<ITagList[]> => {
  const response = await fetch(`${BASE_URL}/post-tags`);
  return await response.json();
};