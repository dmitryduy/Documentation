import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';
import axios from '../axios';

export const sendPost = async (markdown: string, tags: string[], title: string):
Promise<{error: null | string, link: null | string}> => {
  const response = await axios.post('/create-post', {
    markdown,
    tags,
    menu: getMenuFromMarkdown(markdown),
    title
  });

  return response.data;
};