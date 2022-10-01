import { useEffect, useState } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { findPosts } from '../../../reducers/articlesReducer/articlesReducer';
import { FindPostResponse } from '../../../api/postApi/postApi.typings';
import { generateQueryParams } from '../../../utils/generateQueryParams';

export const useFindPosts = (value: string) => {
  const [postsInfo, setPostsInfo] = useState<null | FindPostResponse['foundedPosts']>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value.trim()) {
      setIsLoading(true);
      dispatch(findPosts(generateQueryParams({value: value.trim()})))
        .unwrap()
        .then(data => {
          setPostsInfo(data.foundedPosts);
        })
        .catch(showTooltip)
        .finally(() => setIsLoading(false));
    } else {
      setPostsInfo(null);
    }
  }, [value]);

  return {isLoading, postsInfo, clearPostsInfo: () => setPostsInfo(null)};
};
