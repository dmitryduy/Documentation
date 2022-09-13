import { getMenuFromMarkdown } from '../utils/getMenuFromMarkdown';
import { BASE_URL } from '../global.constants';

export const sendPost = (markdown: string, tags: string[], title: string) => {
  return fetch(`${BASE_URL}/create-post`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      markdown,
      tags,
      menu: getMenuFromMarkdown(markdown),
      title
    })
  });
};