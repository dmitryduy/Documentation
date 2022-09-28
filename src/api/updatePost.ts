import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';
import axios from '../axios';
import { useAppSelector } from '../hooks/useAppSelector';

export const updatePostBackend = async (markdown: string, link: string, owner: string):
  Promise<{error: null | string}> => {
  const response = await axios.put('/update-post', {
    markdown,
    menu: getMenuFromMarkdown(markdown),
    link,
    owner
  });
  return response.data;
};