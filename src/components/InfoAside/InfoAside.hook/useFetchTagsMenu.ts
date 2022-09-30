import { useEffect, useMemo, useState } from 'react';

import { showTooltip } from '../../../utils/showTooltip';
import { ITagList } from '../../../global.typings';
import { useConnection } from '../../../hooks/useConnection';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { getAllTags } from '../../../reducers/articlesReducer/articlesReducer';

export const useFetchTagsMenu = () => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useConnection();
  const dispatch = useAppDispatch();

  const tagsMemo = useMemo(() => tags, [tags]);

  const fetchTags = () => {
    setIsLoading(true);
    dispatch(getAllTags())
      .unwrap()
      .then(data => {
        setIsLoading(false);
        setTags(data.tags);
      })
      .catch(e => {
        setIsLoading(false);
        showTooltip(e);
      });
  };
  useEffect(() => {
    isOnline && fetchTags();
  }, [isOnline]);

  return {isLoading, tags: tagsMemo};
};
