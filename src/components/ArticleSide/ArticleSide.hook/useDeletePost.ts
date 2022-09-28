import { useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';
import { deletePost } from '../../../api/deletePost';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';

export const useDeletePost = () => {
  const {login} = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const removePost =  (link: string) => {
    deletePost(login || '', link)
      .then(data => {
        if (data.error) {
          showTooltip(data.error);
          return;
        }
        setIsDeleted(true);
        showTooltip('Статья удалена');
      })
      .catch(e => {
        const error = e.response && e.response.data && e.response.data.error;
        showTooltip(error || Errors.UNEXPECTED_ERROR);
      });
  };

  return {isDeleted, removePost};
};
