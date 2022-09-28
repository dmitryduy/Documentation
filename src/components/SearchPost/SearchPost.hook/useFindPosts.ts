import { useEffect, useState } from 'react';

import { findPosts } from '../../../api/findPosts';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';

export const useFindPosts = (value: string) => {
  const [postsInfo, setPostsInfo] = useState<null | {title: string, link: string, owner: string}[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value.trim()) {
      setIsLoading(true);
      findPosts(value.trim())
        .then(data => {
          setIsLoading(false);
          if (data.error) {
            showTooltip(data.error);
            return;
          }
          setPostsInfo(data.foundedPosts);
        })
        .catch(e => {
          setIsLoading(false);
          const error = e.response && e.response.data && e.response.data.error;
          showTooltip(error || Errors.UNEXPECTED_ERROR);
        });
    } else {
      setPostsInfo(null);
    }
  }, [value]);

  return {isLoading, postsInfo, clearPostsInfo: () => setPostsInfo(null)};
};
