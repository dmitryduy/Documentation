import { IPost } from '../global.typings';
import { BASE_URL } from '../global.constants';

export const fetchRandomPost = async (): Promise<IPost> => {
  const response = await fetch(`${BASE_URL}/random`);

  return await response.json();
};