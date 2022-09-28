import axios from '../axios';

export const findPosts = async (value: string):
  Promise<{error: null | string, foundedPosts: {link: string, title: string}[] | null}> => {
  const response = await axios.get(`/find-post/${value}`);

  return response.data;
};