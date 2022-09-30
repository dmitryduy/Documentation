import { useEffect } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { findPost } from '../../../reducers/articlesReducer/articlesReducer';
import { useAppDispatch } from '../../../hooks/useAppSelector';

export const useFetchPost = (title?: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(findPost(title ? {
      params: {
        link: title
      }
    } : undefined))
      .unwrap()
      .catch(showTooltip);

  }, [title]);
};