import { useEffect, useMemo, useState } from 'react';

import { fetchPostsList } from '../../../api/fetchPostsList';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';
import { ITagList } from '../../../global.typings';
import { useConnection } from '../../../hooks/useConnection';

export const useFetchTagsMenu = () => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useConnection();

  const tagsMemo = useMemo(() => tags, [tags]);

  const fetchTags = () => {
    setIsLoading(true);
    fetchPostsList().then(data => {
      setIsLoading(false);
      if (data.error) {
        showTooltip(Errors.BACKEND_ERROR);
        return;
      }
      setTags(data.tags);
    }).catch(() => {
      setIsLoading(false);
      showTooltip(Errors.UNEXPECTED_ERROR);
    });
  };
  useEffect(() => {
    isOnline && fetchTags();
  }, [isOnline]);

  return {isLoading, tags: tagsMemo};
};
