import { useEffect } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { createPostManager } from '../../../api/postManager/createPostManager';
import { endFetchPost, setPost, startFetchPost } from '../../../reducers/postReducer/postReducer';

export const useFetchPost = (title?: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const postManager = createPostManager();
    dispatch(startFetchPost());
    postManager.findOne({link: title || ''})
      .then(data => {
        dispatch(setPost(data));
      })
      .catch(showTooltip)
      .finally(() => dispatch(endFetchPost()));
  }, [title]);
};