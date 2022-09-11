import { BASE_URL } from '../global.constants';

export const fetchNextPost = async (activeLink: string | undefined): Promise<{title: string, link: string} | null> => {
  const response = await fetch(`${BASE_URL}/new-post-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({activeLink})
  });
  return await response.json();
};