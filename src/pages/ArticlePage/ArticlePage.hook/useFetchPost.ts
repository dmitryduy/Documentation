import { useEffect } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { createPostManager } from '../../../api/postManager/createPostManager';
import { endFetchPost, setPost, startFetchPost } from '../../../reducers/postReducer/postReducer';
import { useConnection } from '../../../hooks/useConnection';

export const useFetchPost = (title?: string) => {
  const dispatch = useAppDispatch();
  const isOnline = useConnection();

  useEffect(() => {
    const abortController = new AbortController();
    const postManager = createPostManager();
    isOnline && dispatch(startFetchPost());
    postManager.findOne({link: title || ''}, abortController.signal)
      .then(data => {
        dispatch(setPost(data));
      })
      .catch(showTooltip);

    return () => {
      dispatch(endFetchPost());
      abortController.abort();
    };
  }, [title, isOnline]);
};