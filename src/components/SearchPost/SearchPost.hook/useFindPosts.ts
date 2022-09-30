import { useEffect, useState } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { findPosts } from '../../../reducers/articlesReducer/articlesReducer';

export const useFindPosts = (value: string) => {
  const [postsInfo, setPostsInfo] = useState<null | {title: string, link: string, owner: string}[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value.trim()) {
      setIsLoading(true);
      dispatch(findPosts({
        params: {
          value: value.trim()
        }
      }))
        .unwrap()
        .then(data => {
          setPostsInfo(data.foundedPosts);
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          showTooltip(e);
        });
    } else {
      setPostsInfo(null);
    }
  }, [value]);

  return {isLoading, postsInfo, clearPostsInfo: () => setPostsInfo(null)};
};
