import { useEffect } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { findPost } from '../../../reducers/articlesReducer/articlesReducer';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { generateQueryParams } from '../../../utils/generateQueryParams';

export const useFetchPost = (title?: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(findPost(title ? generateQueryParams({link: title}) : undefined))
      .unwrap()
      .catch(showTooltip);

  }, [title]);
};