import { useEffect, useMemo, useState } from 'react';

import { ITagList } from '../../../global.typings';
import { useConnection } from '../../../hooks/useConnection';
import { createTagsManager } from '../../../api/tagsManager/createTagsManager';
import { showToast } from '../../../utils/showToast';

export const useFetchTagsMenu = () => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useConnection();

  const tagsMemo = useMemo(() => tags, [tags]);

  const fetchTags = () => {
    setIsLoading(true);
    const tagsManager = createTagsManager();
    tagsManager.getAll()
      .then(data => {
        setTags(data.tags);
      })
      .catch(showToast)
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    isOnline && fetchTags();
  }, [isOnline]);

  return {isLoading, tags: tagsMemo};
};
