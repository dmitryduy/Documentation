import { useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { deletePost } from '../../../reducers/articlesReducer/articlesReducer';

export const useDeletePost = () => {
  const {login} = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();
  const removePost =  (link: string) => {
    dispatch(deletePost({owner: login || '', link}))
      .unwrap()
      .then(() => {
        setIsDeleted(true);
        showTooltip('Пост удален');
      })
      .catch(e => {
        setIsDeleted(true);
        showTooltip(e);
      });
  };

  return {isDeleted, removePost};
};
