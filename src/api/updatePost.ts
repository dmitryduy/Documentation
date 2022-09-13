import { BASE_URL } from '../global.constants';
import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';

export const updatePostBackend = (markdown: string, link: string) => {
  return fetch(`${BASE_URL}/update-post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      markdown,
      menu: getMenuFromMarkdown(markdown),
      link
    })
  });
};