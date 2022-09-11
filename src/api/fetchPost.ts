import { IPost } from '../global.typings';
import { BASE_URL } from '../global.constants';

export const fetchPost = async (link: string): Promise<IPost > => {
  const response = await fetch(`${BASE_URL}/post/${link}`);
  return await response.json();
};