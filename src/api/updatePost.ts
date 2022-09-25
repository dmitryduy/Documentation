import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';
import axios from '../axios';

export const updatePostBackend = async (markdown: string, link: string):
  Promise<{error: null | string}> => {
  const response = await axios.put('/update-post', {
    markdown,
    menu: getMenuFromMarkdown(markdown),
    link
  });
  return response.data;
};