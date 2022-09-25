import axios from '../axios';

export const fetchNextPost = async (activeLink: string | undefined):
  Promise<{error: null | string, title: null | string, link: null | string}> => {
  const response = await axios.get(`/random/${activeLink || ''}`);
  return await response.data;
};