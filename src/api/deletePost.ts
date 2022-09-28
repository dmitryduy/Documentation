import axios from '../axios';

export const deletePost = async (owner: string, link: string):
  Promise<{error: null | string}> => {
  const response = await axios.delete('/delete-post', {
    data: {
      owner,
      link
    }
  });
  return await response.data;
};