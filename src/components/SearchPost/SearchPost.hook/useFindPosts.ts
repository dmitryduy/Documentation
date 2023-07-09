import { useEffect, useState } from 'react';

import { FindPostResponse } from '../../../api/postManager/postManager.typings';
import { createPostManager } from '../../../api/postManager/createPostManager';
import { useToast } from '../../../hooks/useToast';

export const useFindPosts = (value: string) => {
  const [postsInfo, setPostsInfo] = useState<null | FindPostResponse['foundedPosts']>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    if (value.trim()) {
      setIsLoading(true);
      const postManager = createPostManager();

      postManager.findPostsByName({value: value.trim()})
        .then(data => setPostsInfo(data.foundedPosts))
        .catch(showToast)
        .finally(() => setIsLoading(false));
    } else {
      setPostsInfo(null);
    }
  }, [value]);

  return {isLoading, postsInfo, clearPostsInfo: () => setPostsInfo(null)};
};
