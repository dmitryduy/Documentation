import { useEffect, useState } from 'react';

import { fetchPost } from '../../../api/fetchPost';
import { fetchRandomPost } from '../../../api/fetchRandomPost';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';
import { setPostInfo } from '../../../reducers/articlesReducer/articlesReducer';
import { useAppDispatch } from '../../../hooks/useAppSelector';

export const useFetchPost = (title?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    (title ? fetchPost(title) : fetchRandomPost()).then(data => {
      setIsLoading(false);
      if (data.error) {
        showTooltip(Errors.BACKEND_ERROR);
        return;
      }
      dispatch(setPostInfo(data.post));
    }).catch(() =>  {
      showTooltip(Errors.UNEXPECTED_ERROR);
      setIsLoading(false);
    });

  }, [title]);

  return isLoading;
};